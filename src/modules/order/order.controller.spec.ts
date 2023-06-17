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
                        update: jest.fn(),
                        updateStock: jest.fn(),
                        findAll: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<OrderController>(OrderController);
        service = module.get<OrderService>(OrderService);
    });
});