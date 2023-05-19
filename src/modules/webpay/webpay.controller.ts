import { Controller, Get, Param } from '@nestjs/common';
import { WebpayService } from './webpay.service';

@Controller('webpay')
export class WebpayController {
  constructor(private readonly webpayService: WebpayService) {}

  @Get('validation/:token')
  async transactionCommit(@Param('token') token: string){
    const response = await this.webpayService.transactionCommit(token);
    return response;
  }
}
