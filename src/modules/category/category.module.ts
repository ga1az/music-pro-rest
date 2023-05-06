import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schemas/category.schema';
import { CATEGORY_REPOSITORY } from './repositories/category.repository';
import { CategoryMongoRepository } from './repositories/category-mongo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, {
    provide: CATEGORY_REPOSITORY,
    useClass: CategoryMongoRepository
  }]
})
export class CategoryModule {}
