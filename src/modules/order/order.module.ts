import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { WebpayModule } from '../webpay/webpay.module';
import { ORDER_REPOSITORY } from './repositories/order.repository';
import { OrderMongoRepository } from './repositories/order-mongo.repository';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    WebpayModule,
    ProductModule
  ],
  controllers: [OrderController],
  providers: [OrderService, {
    provide: ORDER_REPOSITORY,
    useClass: OrderMongoRepository
  }]
})
export class OrderModule {}
