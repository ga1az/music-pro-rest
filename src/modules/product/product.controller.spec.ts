import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import exp from 'constants';

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

    describe('Update', () => {
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