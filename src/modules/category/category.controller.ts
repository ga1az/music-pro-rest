import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Get(':name')
  async findIdByName(@Param('name') name: string): Promise<string> {
    return await this.categoryService.findIdByName(name);
  }
}
