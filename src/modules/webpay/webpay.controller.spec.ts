import { Test, TestingModule } from '@nestjs/testing';
import { WebpayController } from './webpay.controller';
import { WebpayService } from './webpay.service';

describe('WebpayController', () => {
    let controller: WebpayController;
    let service: WebpayService;

    beforeEach(async () => {
        service = new WebpayService(null, null);
        controller = new WebpayController(service);
        const module: TestingModule = await Test.createTestingModule({
            controllers: [WebpayController],
            providers: [
                {
                    provide: WebpayService,
                    useValue: {
                        createTransaction: jest.fn(),
                        createPreTransaction: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<WebpayController>(WebpayController);
        service = module.get<WebpayService>(WebpayService);
    });

    describe('createTransaction', () => {
        it('should return a URL to Webpay', async () => {
            const buyOrder = '31134234';
            const url = 'https://webpay.com/transaction';

            jest.spyOn(service, 'createPreTransaction').mockImplementation(
                async () => ({
                    url: `${url}?token_ws=1234567890`,
                }),
            );

            const expected = {
                url: `${url}?token_ws=1234567890`,
            };

            const response = await controller.createTransaction(buyOrder);

            expect(response).toEqual(expected);
            expect(response.url).toContain(url);
            expect(response.url).toContain('token_ws');
        });
    });
});
