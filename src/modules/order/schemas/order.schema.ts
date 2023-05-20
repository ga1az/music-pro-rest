import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Model } from "mongoose";

export type OrderDocument = Order & Document;

@Schema()
export class Order{
  @Prop({default: Date.now})
  date: Date;

  @Prop({required: true})
  rut: string;

  @Prop({required: true})
  branchCode: number;

  @Prop({default: () => Math.floor(Math.random() * 1000000000).toString()})
  buyOrder: string;

  @Prop({default: () => Math.floor(Math.random() * 1000000000).toString()})
  sessionId: string;

  @Prop({required: true, default: 'PENDING'})
  status: string;

  @Prop({required: true})
  products: [
    {
      sku: {type: number, ref: 'Product', required: true},
      quantity: {type: Number, required: true}
    }
  ]

  @Prop({required: true})
  total: number;
}

export type OrderModel = Model<OrderDocument>;

export const OrderSchema = SchemaFactory.createForClass(Order);