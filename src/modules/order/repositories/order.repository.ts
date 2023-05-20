import { CreateOrderDto } from "../dto/create-order.dto";
import { Order } from "../entities/order.entity";

export const ORDER_REPOSITORY = 'OrderRepository';

export interface OrderRepository {
  findAll(): Promise<Order[]>;
  create(order: CreateOrderDto): Promise<Order>;
  findByBuyOrder(buyOrder: string): Promise<Order>;
  changeStatus(buyOrder: string, status: string): Promise<Order>;
}