import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OrderService } from '../order/order.service';
import { ResposeCreatePreTransactionDto } from './dto/response-create-pre-transaction.dto';
import { ResponseCommitTransactionDto } from './dto/response-commit-transaction.dto';
import { ResponseCommitDto } from './dto/response-commit.dto';

@Injectable()
export class WebpayService {
  constructor(private configService: ConfigService, private orderService: OrderService ) {}

  async createTransaction(amount: number, buyOrder: string, sessionId: string): Promise<{token:string, url:string}> {
    const urlToken = fetch('https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Tbk-Api-Key-Id': this.configService.get<string>('TBK_API_KEY_ID'),
        'Tbk-Api-Key-Secret': this.configService.get<string>('TBK_API_KEY_SECRET')
      },
      body: JSON.stringify({
        "buy_order": buyOrder,
        "session_id": sessionId,
        "amount": amount,
        "return_url": `http://localhost:3000/webpay/validation?buyOrder=${buyOrder}`
      })
    })
    .then(res => res.json())
    .then(json => json);
    // json.url?token_ws=json.token
    return urlToken;
  }

  async commitTransaction(buy_order: string, token: string): Promise<ResponseCommitTransactionDto> {
    const response: ResponseCommitDto = await fetch(`https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions/${token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Tbk-Api-Key-Id': this.configService.get<string>('TBK_API_KEY_ID'),
        'Tbk-Api-Key-Secret': this.configService.get<string>('TBK_API_KEY_SECRET')
      }
    })
    .then(res => res.json())
    .then(json => json);

    if (response.status === 'AUTHORIZED') {
      await this.orderService.changeStatus(buy_order, 'APPROVED');
      return {msg:"Transacción aprobada"}
    } else {
      await this.orderService.changeStatus(buy_order, 'REJECTED');
      return {msg:"Transacción rechazada"}
    }
  }
  
  async createPreTransaction(buyOrder: string): Promise<ResposeCreatePreTransactionDto>{
    const order = await this.orderService.findByBuyOrder(buyOrder);
    if (!order) {
      throw new NotFoundException(`Order with buyOrder ${buyOrder} not found`);
    }else if(order.status !== 'PENDING'){
      throw new NotFoundException(`Order with buyOrder ${buyOrder} is not pending`);
    }
    const amount = order.total;
    const sessionId = order.sessionId;
    const response = await this.createTransaction(amount, buyOrder, sessionId);
    return {url: `${response.url}?token_ws=${response.token}`}
  }

}
