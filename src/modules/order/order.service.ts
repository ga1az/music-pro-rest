import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ORDER_REPOSITORY, OrderRepository } from './repositories/order.repository';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { WebpayService } from '../webpay/webpay.service';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService {
  constructor(@Inject(ORDER_REPOSITORY) private readonly orderRepository: OrderRepository, private webpayService: WebpayService, private productService: ProductService) {}

  async findAll(): Promise<Order[]> {
    try {
      return await this.orderRepository.findAll();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(order: CreateOrderDto): Promise<any> {
    try {
      const products = order.products.map(async (product) => {
        const productExists = await this.productService.exists(product.sku);
        if (!productExists) {
          throw new NotFoundException(`Product with SKU ${product.sku} not found`);
        }
      });
  
      await Promise.all(products);
  
      const createdOrder = await this.orderRepository.create(order);
      const webpay = await this.webpayService.createTransaction(createdOrder.total, createdOrder.buyOrder, createdOrder.sessionId);
      return webpay;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
