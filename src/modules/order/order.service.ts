import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ORDER_REPOSITORY, OrderRepository } from './repositories/order.repository';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService {
  constructor(@Inject(ORDER_REPOSITORY) private readonly orderRepository: OrderRepository, private productService: ProductService) { }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }

  async create(order: CreateOrderDto): Promise<any> {
    const products = order.products.map(async (product) => {
      const productExists = await this.productService.exists(product.sku);
      if (!productExists) {
        throw new NotFoundException(`Product with SKU ${product.sku} not found`);
      }
    });

    await Promise.all(products);
    return await this.orderRepository.create(order);
  }

  async findByBuyOrder(buyOrder: string): Promise<Order> {
    return await this.orderRepository.findByBuyOrder(buyOrder);
  }

  async changeStatus(buyOrder: string, status: string): Promise<Order> {
    return await this.orderRepository.changeStatus(buyOrder, status);
  }
}
