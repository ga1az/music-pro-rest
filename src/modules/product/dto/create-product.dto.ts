import { IsNotEmpty, IsString, IsNumber, Length, Max } from "class-validator";

export class CreateProductDto{
  @IsNotEmpty()
  @IsNumber()
  @Max(999)
  sku: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(99999999)
  price: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  description: string;

  @IsNotEmpty()
  @IsString({ each: true })
  @Length(1, 50, { each: true })
  categories: string[];

  @IsNotEmpty()
  @IsNumber()
  @Max(99999)
  stock: number;
}