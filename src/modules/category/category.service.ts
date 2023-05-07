import { Inject, Injectable} from '@nestjs/common';
import { CATEGORY_REPOSITORY, CategoryRepository } from './repositories/category.repository';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY) private readonly categoryRepository: CategoryRepository
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }

  async findIdByName(name: string): Promise<string> {
    return await this.categoryRepository.findIdByName(name);
  }
}