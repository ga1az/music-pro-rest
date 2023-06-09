import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument, ProductModel } from '../schemas/product.schema';

@Injectable()
export class ProductMongoRepository implements ProductRepository {
    constructor(
        @InjectModel(Product.name) private productModel: ProductModel,
    ) {}

    async findAll(inStock: boolean): Promise<Product[]> {
        if (inStock) {
            const products = await this.productModel
                .find({ stock: { $gt: 0 } })
                .exec();
            return products.map((product) => this.mapToProduct(product));
        }

        const products = await this.productModel.find().exec();
        return products.map((product) => this.mapToProduct(product));
    }

    async findIdBySku(sku: number): Promise<string> {
        const id = await this.productModel
            .findOne({ sku: sku })
            .select('_id')
            .exec();
        return id._id.toString();
    }

    async exists(sku: number): Promise<boolean> {
        const product = await this.productModel.findOne({ sku: sku }).exec();
        return !!product;
    }

    async create(product: CreateProductDto): Promise<Product> {
        const createdProduct = await new this.productModel(product).save();
        return this.mapToProduct(createdProduct);
    }

    async update(sku: number, product: Product): Promise<Product> {
        const updatedProduct = await this.productModel
            .findOneAndUpdate({ sku: sku }, product, { new: true })
            .exec();
        return this.mapToProduct(updatedProduct);
    }

    async delete(sku: number): Promise<void> {
        await this.productModel.deleteOne({ sku: sku }).exec();
    }

    async getTotal(sku: number, quantity: number): Promise<number> {
        const product = await this.productModel.findOne({ sku: sku }).exec();
        if (!product) {
            throw new NotFoundException(`Product with SKU ${sku} not found`);
        }
        return quantity * product.price;
    }

    async getStock(sku: number): Promise<number> {
        const product = await this.productModel.findOne({ sku: sku }).exec();
        if (!product) {
            throw new NotFoundException(`Product with SKU ${sku} not found`);
        }
        return product.stock;
    }

    async changeStock(sku: number, quantity: number): Promise<Product> {
        //reduce the stock
        const product = await this.productModel
            .findOneAndUpdate(
                { sku: sku },
                { $inc: { stock: -quantity } },
                { new: true },
            )
            .exec();
        if (!product) {
            throw new NotFoundException(`Product with SKU ${sku} not found`);
        }
        return this.mapToProduct(product);
    }

    async updateStock(sku: number, quantity: number): Promise<Product> {
        //change the stock for the one entered
        const product = await this.productModel
            .findOneAndUpdate({ sku: sku }, { stock: quantity }, { new: true })
            .exec();
        if (!product) {
            throw new NotFoundException(`Product with SKU ${sku} not found`);
        }

        return this.mapToProduct(product);
    }

    private mapToProduct(productDocument: ProductDocument): Product {
        const product = new Product();
        product.sku = productDocument.sku;
        product.name = productDocument.name;
        product.price = productDocument.price;
        product.description = productDocument.description;
        product.stock = productDocument.stock;
        product.categories = productDocument.categories.map((category) =>
            category.toString(),
        );
        return product;
    }
}
