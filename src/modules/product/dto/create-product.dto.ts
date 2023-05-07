import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateProductDto{
  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  categories: string[];

  @IsNotEmpty()
  @IsNumber()
  stock: number;
}