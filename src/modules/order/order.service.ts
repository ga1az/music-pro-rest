import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
    ORDER_REPOSITORY,
    OrderRepository,
} from './repositories/order.repository';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService {
    constructor(
        @Inject(ORDER_REPOSITORY)
        private readonly orderRepository: OrderRepository,
        private productService: ProductService,
    ) {}

    async findAll(): Promise<Order[]> {
        return await this.orderRepository.findAll();
    }

    async create(order: CreateOrderDto): Promise<any> {
        try {
            const products = order.products.map(async (product) => {
                const productExists = await this.productService.exists(
                    product.sku,
                );
                if (!productExists) {
                    throw new NotFoundException(
                        `Product with SKU ${product.sku} not found`,
                    );
                }
                const productStock = await this.productService.getStock(
                    product.sku,
                );
                if (productStock < product.quantity) {
                    throw new NotFoundException(
                        `Insufficient stock for product with SKU ${product.sku}`,
                    );
                }
                //Calcula el total del producto
                const productTotal = await this.productService.getTotal(
                    product.sku,
                    product.quantity,
                );
                if (productTotal !== order.total) {
                    throw new NotFoundException(
                        `The total of the product with SKU ${product.sku} is incorrect`,
                    );
                }
                // Reduce el stock del producto
                await this.productService.changeStock(
                    product.sku,
                    product.quantity,
                );
            });
            await Promise.all(products);

            const createdOrder = await this.orderRepository.create(order);
            return createdOrder;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async findByBuyOrder(buyOrder: string): Promise<Order> {
        return await this.orderRepository.findByBuyOrder(buyOrder);
    }

    async changeStatus(buyOrder: string, status: string): Promise<Order> {
        return await this.orderRepository.changeStatus(buyOrder, status);
    }
}
