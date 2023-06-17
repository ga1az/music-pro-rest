import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    Query,
    HttpException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import {
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { PutProductStock } from './dto/put-product-stock';

@ApiTags('product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @ApiOperation({ summary: 'Obtiene todos los productos' })
    @ApiResponse({
        status: 200,
        description: 'Productos obtenidos',
        type: Product,
    })
    @ApiQuery({ name: 'inStock', required: false, type: Boolean })
    @Get()
    async findAll(
        @Query('inStock') inStock: boolean = false,
    ): Promise<Product[]> {
        // if no products return 404
        if ((await this.productService.findAll(inStock)).length === 0) {
            throw new HttpException('No products found', 404);
        }
        return await this.productService.findAll(inStock);
    }

    @ApiOperation({ summary: 'Obtiene un producto por su sku' })
    @ApiResponse({
        status: 200,
        description: 'Producto obtenido',
        type: Product,
    })
    @ApiParam({ name: 'sku', required: true, type: Number })
    @Get(':sku')
    async findIdBySku(@Param('sku') sku: number): Promise<string> {
        return await this.productService.findIdBySku(sku);
    }

    @ApiOperation({ summary: 'Verifica si existe un producto por su sku' })
    @ApiResponse({
        status: 200,
        description: 'Producto encontrado',
        type: Boolean,
    })
    @ApiParam({ name: 'sku', required: true, type: Number })
    @Get(':sku/exists')
    async exists(@Param('sku') sku: number): Promise<boolean> {
        return await this.productService.exists(sku);
    }

    @ApiOperation({ summary: 'Crea un producto' })
    @ApiResponse({ status: 200, description: 'Producto creado', type: Product })
    @ApiBody({ type: CreateProductDto })
    @Post()
    async create(@Body() product: CreateProductDto): Promise<Product> {
        return await this.productService.create(product);
    }

    @ApiOperation({ summary: 'Actualiza un producto' })
    @ApiResponse({
        status: 200,
        description: 'Producto actualizado',
        type: Product,
    })
    @ApiParam({ name: 'sku', required: true, type: Number })
    @ApiBody({ type: Product })
    @Put(':sku')
    async update(
        @Param('sku') sku: number,
        @Body() product: Product,
    ): Promise<Product> {
        return await this.productService.update(sku, product);
    }

    @ApiOperation({ summary: 'Elimina un producto' })
    @ApiResponse({ status: 200, description: 'Producto eliminado' })
    @ApiParam({ name: 'sku', required: true, type: Number })
    @Delete(':sku')
    async delete(@Param('sku') sku: number): Promise<void> {
        return await this.productService.delete(sku);
    }

    @ApiOperation({ summary: 'Cambia el stock de un producto' })
    @ApiResponse({ status: 200, description: 'Stock cambiado', type: Product })
    @ApiParam({ name: 'sku', required: true, type: Number })
    @Get(':sku/stock')
    async getStock(@Param('sku') sku: number): Promise<number> {
        return await this.productService.getStock(sku);
    }

    @ApiOperation({ summary: 'Cambia el stock de un producto' })
    @ApiParam({ name: 'sku', required: true, type: Number })
    @ApiResponse({ status: 200, description: 'Stock cambiado', type: Product })
    @ApiBody({ type: PutProductStock })
    @Put(':sku/stock')
    async updateStock(
        @Param('sku') sku: number,
        @Body('quantity') quantity: number,
    ): Promise<Product> {
        //don't let add negative stock
        if (quantity <= 0) {
            throw new HttpException('Negative stock is not allowed', 400);
        }
        return await this.productService.updateStock(sku, quantity);
    }
}
