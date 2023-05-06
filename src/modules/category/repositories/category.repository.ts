import { Category } from "../entities/category.entity";

export const CATEGORY_REPOSITORY = 'CategoryRepository';

export interface CategoryRepository {
  findAll(): Promise<Category[]>;
}