import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Order } from "../entities/order.entity";
import { OrderDocument, OrderModel } from "../schemas/order.schema";

@Injectable()
export class OrderMongoRepository {
  //inject webpay service
  constructor(@InjectModel(Order.name) private orderModel: OrderModel) {}

  async findAll(): Promise<Order[]> {
    const orders = await this.orderModel.find().exec();
    return orders
  }

  async create(order: Order): Promise<Order> {
    const createdOrder = await new this.orderModel(order).save();
    return createdOrder
  }


  private mapToOrder(orderDocument: OrderDocument): Order {
    const order = new Order();
    order.date = orderDocument.date;
    order.buyOrder = orderDocument.buyOrder;
    order.sessionId = orderDocument.sessionId;
    order.rut = orderDocument.rut;
    order.branchCode = orderDocument.branchCode;
    order.products = orderDocument.products.map(product => product);
    order.total = orderDocument.total;
    return order;
  }
}