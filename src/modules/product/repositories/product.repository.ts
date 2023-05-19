import { CreateProductDto } from "../dto/create-product.dto";
import { Product } from "../entities/product.entity";

export const PRODUCT_REPOSITORY = 'ProductRepository';

export interface ProductRepository {
  findAll(): Promise<Product[]>;
  findIdBySku(sku: number): Promise<string>;
  create(product: CreateProductDto): Promise<Product>;
  exists(sku: number): Promise<boolean>;
  update(sku: number, product: Product): Promise<Product>;
  delete(sku: number): Promise<void>;
}