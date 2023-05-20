import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { WebpayService } from './webpay.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseCommitTransactionDto } from './dto/response-commit-transaction.dto';
import { ResposeCreatePreTransactionDto } from './dto/response-create-pre-transaction.dto';

@ApiTags('Webpay')
@Controller('webpay')
export class WebpayController {
  constructor(private readonly webpayService: WebpayService) {}

  @ApiOperation({summary: 'Valida la transacción'})
  @ApiResponse({status: 200, description: 'Transacción aprobada', type: ResponseCommitTransactionDto})
  @Get('validation')
  async commitTransaction(@Query('token_ws') token: string, @Query('buyOrder') buyOrder: string): Promise<ResponseCommitTransactionDto>{
    return await this.webpayService.commitTransaction(buyOrder,token);
  }

  @ApiOperation({summary: 'Crea una transacción'})
  @ApiResponse({status: 200, description: 'Transacción creada', type: ResposeCreatePreTransactionDto})
  @Post(':buyOrder')
  async createTransaction(@Param('buyOrder') buyOrder: string): Promise<ResposeCreatePreTransactionDto>{
    return await this.webpayService.createPreTransaction(buyOrder)
  }
}
