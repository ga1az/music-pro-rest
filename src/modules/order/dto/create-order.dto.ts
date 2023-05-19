import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

class ProductDto {
  @IsNotEmpty()
  @IsNumber()
  sku: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];

  @IsNotEmpty()
  @IsNumber()
  total: number;
}
