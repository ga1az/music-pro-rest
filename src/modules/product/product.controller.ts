import { Controller, Get, Param, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiQuery({ name: 'inStock', required: false, type: Boolean })
  @Get()
  async findAll(@Query('inStock') inStock:boolean = false): Promise<Product[]> {
    return await this.productService.findAll(inStock);
  }

  @ApiParam({ name: 'sku', required: true, type: Number })
  @Get(':sku')
  async findIdBySku(@Param ('sku') sku: number): Promise<string> {
    return await this.productService.findIdBySku(sku);
  }

  @ApiParam({ name: 'sku', required: true, type: Number })
  @Get(':sku/exists')
  async exists(@Param ('sku') sku: number): Promise<boolean> {
    return await this.productService.exists(sku);
  }

  @ApiBody({ type: CreateProductDto })
  @Post()
  async create(@Body() product: CreateProductDto): Promise<Product> {
    return await this.productService.create(product);
  }

  @ApiParam({ name: 'sku', required: true, type: Number })
  @ApiBody({ type: Product })
  @Put(':sku')
  async update(@Param ('sku') sku: number, @Body() product: Product): Promise<Product> {
    return await this.productService.update(sku, product);
  }

  @ApiParam({ name: 'sku', required: true, type: Number })
  @Delete(':sku')
  async delete(@Param ('sku') sku: number): Promise<void> {
    return await this.productService.delete(sku);
  }

  @ApiParam({ name: 'sku', required: true, type: Number })
  @ApiBody({ type: Number })
  @Put(':sku/stock')
  async changeStock(@Param ('sku') sku: number, @Body('quantity') quantity: number): Promise<Product> {
    return await this.productService.changeStock(sku, quantity);
  }
}
