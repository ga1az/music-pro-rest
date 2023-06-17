import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { HttpException } from '@nestjs/common';

describe('OrderController', () => {
    let controller: OrderController;
    let service: OrderService;

    beforeEach(async () => {
        service = new OrderService(null, null);
        controller = new OrderController(service);
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrderController],
            providers: [
                {
                    provide: OrderService,
                    useValue: {
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<OrderController>(OrderController);
        service = module.get<OrderService>(OrderService);
    });

    it('should create a order', async () => {
        const order = {
            products: [
                {
                    sku: 1234567,
                    quantity: 1,
                },
            ],
            total: 1000,
            rut: '12345678-9',
            branchCode: 1,
        };

        const result = {
            id: 1,
            ...order,
        };

        jest.spyOn(service, 'create').mockImplementation(async () => result);

        expect(await controller.create(order)).toBe(result);
    });

    it('should return a 400 HTTP status code if the total is incorrect', async () => {
        const order = {
            products: [
                {
                    sku: 1234567,
                    quantity: 1,
                },
            ],
            total: 100,
            rut: '12345678-9',
            branchCode: 1,
        };

        const result = {
            id: 1,
            ...order,
        };

        jest.spyOn(service, 'create').mockImplementation(async () => result);

        try {
            await controller.create(order);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.status).toBe(400);
            expect(error.message).toBe('El total no es correcto');
        }
    });
});
