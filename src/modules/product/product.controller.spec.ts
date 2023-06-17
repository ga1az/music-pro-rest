import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import exp from 'constants';
import { ConflictException } from '@nestjs/common';

// create an unit test that test the post of a product
describe('ProductController', () => {
    let controller: ProductController;
    let service: ProductService;

    beforeEach(async () => {
        service = new ProductService(null);
        controller = new ProductController(service);
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                {
                    provide: ProductService,
                    useValue: {
                        create: jest.fn(),
                        update: jest.fn(),
                        updateStock: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<ProductController>(ProductController);
        service = module.get<ProductService>(ProductService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a product', async () => {
        const product = {
            name: 'Product 1',
            description: 'Product description',
            price: 10,
            sku: 123,
            categories: ['Category 1', 'Category 2'],
            stock: 10,
        };

        const result = {
            id: 1,
            ...product,
        };



        jest.spyOn(service, 'create').mockImplementation(async () => result);

        expect(await controller.create(product)).toBe(result);
    });

    it('should update a product name', async () => {
        const product = {
            name: 'Product 1',
            description: 'Product description',
            price: 10,
            sku: 123,
            categories: ['Category 1', 'Category 2'],
            stock: 10,
        };

        const result = {
            id: 1,
            ...product,
        };

        jest.spyOn(service, 'update').mockImplementation(async () => result);

        expect(await controller.update(123, product)).toBe(result);
    });

    it('should modify the stock of a product', async () => {
        const product = {
            name: 'Product 1',
            description: 'Product description',
            price: 10,
            sku: 123,
            categories: ['Category 1', 'Category 2'],
            stock: 10,
        };

        const updatedProduct = {
            ...product,
            stock: -5,
        };

        jest.spyOn(service, 'update').mockImplementation(async () => updatedProduct);

        expect(await controller.update(123, updatedProduct)).toBe(updatedProduct);
    });

    it('should throw an exception when updating stock with negative value', async () => {
        const sku = 123;
        const quantity = -5;

        jest.spyOn(service, 'updateStock').mockImplementation(async () => {
            throw new ConflictException(`The quantity can't be negative`);
        });

        await expect(controller.updateStock(sku, quantity)).rejects.toThrow(`The quantity can't be negative`);
    });



    it('should fail to create a product without a category', async () => {
        const product = {
            name: 'Product 2',
            description: 'Product description',
            price: 20,
            sku: 456,
            stock: 5,
            categories: [],
        };

        jest.spyOn(service, 'create').mockImplementation(async () => {
            throw new Error('Product must have at least one category');
        });

        await expect(controller.create(product)).rejects.toThrow('Product must have at least one category');
    });

});