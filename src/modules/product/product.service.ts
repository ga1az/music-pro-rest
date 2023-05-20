import { Inject, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PRODUCT_REPOSITORY, ProductRepository } from './repositories/product.repository';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly productRepository: ProductRepository
  ) { }

  async findAll(inStock: boolean): Promise<Product[]> {
    return await this.productRepository.findAll(inStock);
  }

  async findIdBySku(sku: number): Promise<string> {
    return await this.productRepository.findIdBySku(sku);
  }

  async exists(sku: number): Promise<boolean> {
    return await this.productRepository.exists(sku);
  }

  async create(product: CreateProductDto): Promise<Product> {
    const exists = await this.productRepository.exists(product.sku);
    if (exists) {
      throw new ConflictException(`Product with SKU ${product.sku} already exists`);
    }
    return await this.productRepository.create(product);
  }

  async update(sku: number, product: Product): Promise<Product> {
    const exists = await this.productRepository.exists(sku);
    if (!exists) {
      throw new NotFoundException(`Product with SKU ${sku} not found`);
    }
    //product quantity update can't be negative
    if (product.stock < 0) {
      throw new ConflictException(`The quantity can't be negative`);
    }
    //product price update can't be negative
    if (product.price < 0) {
      throw new ConflictException(`The price can't be negative`);
    }
    return await this.productRepository.update(sku, product);
  }

  async delete(sku: number): Promise<void> {
    const exists = await this.productRepository.exists(sku);
    if (!exists) {
      throw new NotFoundException(`Product with SKU ${sku} not found`);
    }
    return await this.productRepository.delete(sku);
  }
  async getStock(sku: number): Promise<number> {
    return await this.productRepository.getStock(sku);
  }

  async getTotal(sku: number, quantity: number): Promise<number> {
    return await this.productRepository.getTotal(sku, quantity);
  }

  async changeStock(sku: number, quantity: number): Promise<Product> {
    const exists = await this.productRepository.exists(sku);
    if (!exists) {
      throw new NotFoundException(`Product with SKU ${sku} not found`);
    }
    return await this.productRepository.changeStock(sku, quantity);
  }

  async updateStock(sku: number, quantity: number): Promise<Product> {
    const exists = await this.productRepository.exists(sku);
    if (!exists) {
      throw new NotFoundException(`Product with SKU ${sku} not found`);
    }
    //quantity can't be negative
    if (quantity < 0) {
      throw new ConflictException(`The quantity can't be negative`);
    }
    return await this.productRepository.updateStock(sku, quantity);
  }
}
