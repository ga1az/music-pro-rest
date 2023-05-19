import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get(':sku')
  async findIdBySku(@Param ('sku') sku: number): Promise<string> {
    return await this.productService.findIdBySku(sku);
  }

  @Get(':sku/exists')
  async exists(@Param ('sku') sku: number): Promise<boolean> {
    return await this.productService.exists(sku);
  }

  @Post()
  async create(@Body() product: CreateProductDto): Promise<Product> {
    return await this.productService.create(product);
  }

  @Put(':sku')
  async update(@Param ('sku') sku: number, @Body() product: Product): Promise<Product> {
    return await this.productService.update(sku, product);
  }

  @Delete(':sku')
  async delete(@Param ('sku') sku: number): Promise<void> {
    return await this.productService.delete(sku);
  }
}
