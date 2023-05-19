import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}


  @Post()
  async create(@Body() orderBody: CreateOrderDto): Promise<any> {
    const order = await this.orderService.create(orderBody);
    return order;
  }
}
