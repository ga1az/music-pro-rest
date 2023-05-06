import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type OrderDocument = Order & Document;

@Schema()
export class Order{
  @Prop({default: Date.now})
  date: Date;

  @Prop({required: true})
  rut: string;

  @Prop({required: false}) 
  branchCode: string;

  @Prop({required: true})
  products: [
    {
      sku: {type: String, ref: 'Product', required: true},
      quantity: {type: Number, required: true}
    }
  ]

  @Prop({required: true})
  subTotal: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);