import { Category } from "../entities/category.entity";


export interface CategoryRepository {
  findAll(): Promise<Category[]>;

}