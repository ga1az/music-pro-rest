import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { CreateProductDto } from "../dto/create-product.dto";
import { Product } from "../entities/product.entity";
import { InjectModel } from "@nestjs/mongoose";
import { ProductDocument, ProductModel } from "../schemas/product.schema";

@Injectable()
export class ProductMongoRepository implements ProductRepository{
  constructor(@InjectModel(Product.name) private productModel: ProductModel) {}

  async findAll(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  async findIdBySku(sku: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  async create(product: CreateProductDto): Promise<Product> {
    const createdProduct = await new this.productModel(product).save();
    return this.mapToProduct(createdProduct);
    
  }
  async update(product: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  async delete(sku: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private mapToProduct(productDocument: ProductDocument): Product {
    const product = new Product();
    product.sku = productDocument.sku;
    product.name = productDocument.name;
    product.price = productDocument.price;
    product.description = productDocument.description;
    product.stock = productDocument.stock;
    product.categories = productDocument.categories.map(category => category.toString());
    return product;
  }
}