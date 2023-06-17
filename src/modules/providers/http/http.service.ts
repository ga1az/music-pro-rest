import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class HttpCustomService {
    constructor(private readonly httpService: HttpService) {}
    public async createTransaction(
        amount: number,
        buyOrder: string,
        sessionId: string,
        keyId: string,
        keySecret: string,
        url: string,
    ) {
        this.httpService
            .post(
                url,
                {
                    buy_order: buyOrder,
                    session_id: sessionId,
                    amount: amount,
                    return_url: 'http://localhost:3000/api',
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Tbk-Api-Key-Id': keyId,
                        'Tbk-Api-Key-Secret': keySecret,
                    },
                },
            )
            .subscribe((response) => response.data);
    }
}
