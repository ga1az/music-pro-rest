import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { CategoryRepository } from "./category.repository";
import { Category } from "../entities/category.entity";
import { CategoryDocument, CategoryModel } from "../schemas/category.schema";


@Injectable()
export class CategoryMongoRepository implements CategoryRepository {
  constructor(@InjectModel(Category.name) private categoryModel: CategoryModel) {}

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryModel.find().exec();
    return categories;
  }

  async findIdByName(name: string): Promise<string> {
    const category = await this.categoryModel.findOne({name: name}).exec();
    return category.id;
  }

  async create(name: string): Promise<Category> {
    const category = new this.categoryModel({name: name})
    const categoryDocument = await category.save();
    return this.mapToCategory(categoryDocument);
  }

  private mapToCategory(categoryDocument: CategoryDocument): Category {
    const category = new Category();
    category.id = categoryDocument.id;
    category.name = categoryDocument.name;
    category.createdAt = categoryDocument.createdAt;
    category.updatedAt = categoryDocument.updatedAt;
    return category;
  }
}