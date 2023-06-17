import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    get id(): string {
        return this.id.toString();
    }
}

export type CategoryModel = Model<CategoryDocument>;

export const CategorySchema = SchemaFactory.createForClass(Category);
