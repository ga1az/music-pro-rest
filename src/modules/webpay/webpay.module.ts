import { Module } from '@nestjs/common';
import { WebpayService } from './webpay.service';
import { WebpayController } from './webpay.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [WebpayController],
  providers: [WebpayService],
  exports: [WebpayService]
})
export class WebpayModule {}
