import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ default: Date.now })
    created_at: Date;

    @Prop({ default: () => Math.floor(Math.random() * 1000000000).toString() })
    id: number;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true, default: 'local' })
    authStrategy: string;
}

export type UserModel = Model<UserDocument>;

export const UserSchema = SchemaFactory.createForClass(User);
