import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { PRODUCT_REPOSITORY } from './repositories/product.repository';
import { ProductMongoRepository } from './repositories/product-mongo.repository';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService, {
    provide: PRODUCT_REPOSITORY,
    useClass: ProductMongoRepository
  }],
  exports: [ProductService]
})
export class ProductModule {}
