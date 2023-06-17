import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../entities/product.entity';

export const PRODUCT_REPOSITORY = 'ProductRepository';

export interface ProductRepository {
    findAll(inStock: boolean): Promise<Product[]>;
    findIdBySku(sku: number): Promise<string>;
    create(product: CreateProductDto): Promise<Product>;
    exists(sku: number): Promise<boolean>;
    update(sku: number, product: Product): Promise<Product>;
    delete(sku: number): Promise<void>;
    getStock(sku: number): Promise<number>;
    getTotal(sku: number, quantity: number): Promise<number>;
    changeStock(sku: number, quantity: number): Promise<Product>;
    updateStock(sku: number, quantity: number): Promise<Product>;
}
