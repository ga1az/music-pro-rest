import { Module } from '@nestjs/common';
import { WebpayService } from './webpay.service';
import { WebpayController } from './webpay.controller';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from '../order/order.module';

@Module({
    imports: [ConfigModule, OrderModule],
    controllers: [WebpayController],
    providers: [WebpayService],
})
export class WebpayModule {}
