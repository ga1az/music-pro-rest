import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';

@ApiTags('order')
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @ApiOperation({ summary: 'Obtiene todas las ordenes' })
    @ApiResponse({ status: 200, description: 'Ordenes obtenidas', type: Order })
    @Get()
    async findAll(): Promise<Order[]> {
        return await this.orderService.findAll();
    }

    @ApiOperation({ summary: 'Crea una orden' })
    @ApiResponse({ status: 200, description: 'Orden creada', type: Order })
    @Post()
    async create(@Body() orderBody: CreateOrderDto): Promise<Order> {
        const order = await this.orderService.create(orderBody);
        return order;
    }
}
