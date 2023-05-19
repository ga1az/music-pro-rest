import { Category } from "../entities/category.entity";

export const CATEGORY_REPOSITORY = 'CategoryRepository';

export interface CategoryRepository {
  findAll(): Promise<Category[]>;
  findIdByName(name: string): Promise<string>;
  create(name: string): Promise<Category>;
}