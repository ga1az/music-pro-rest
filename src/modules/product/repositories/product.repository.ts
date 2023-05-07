import { CreateProductDto } from "../dto/create-product.dto";
import { Product } from "../entities/product.entity";

export const PRODUCT_REPOSITORY = 'ProductRepository';

export interface ProductRepository {
  findAll(): Promise<Product[]>;
  findIdBySku(sku: string): Promise<string>;
  create(product: CreateProductDto): Promise<Product>;
  update(product: Product): Promise<Product>;
  delete(sku: string): Promise<void>;
}