import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WebpayService {
  constructor(private configService: ConfigService) {}

  async createTransaction(amount: number, buyOrder: string, sessionId: string) {
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
        "return_url": 'http://localhost:3000/api'
      })
    })
    .then(res => res.json())
    .then(json => json);
    // json.url?token_ws=json.token
    return urlToken;
  }

  async transactionCommit(token: string) {
    const response = fetch(`https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions/${token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Tbk-Api-Key-Id': this.configService.get<string>('TBK_API_KEY_ID'),
        'Tbk-Api-Key-Secret': this.configService.get<string>('TBK_API_KEY_SECRET')
      }
    })
    .then(res => res.json())
    .then(json => json);

    return response;
  }
}
