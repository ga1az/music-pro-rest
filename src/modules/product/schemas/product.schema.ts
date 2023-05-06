import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type ProductDocument = Product & Document;

@Schema()
export class Product{
  @Prop({required: true, unique: true})
  sku: string;

  @Prop({required: true})
  name: string;

  @Prop({required: true})
  price: number;

  @Prop({required: true})
  description: string;

  @Prop({required: true, type: Types.ObjectId, ref: 'Category'})
  categories: Types.ObjectId[];

  @Prop({required: true})
  stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);