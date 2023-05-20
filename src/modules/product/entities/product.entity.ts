import { ApiProperty } from "@nestjs/swagger";
import { Max, Min } from "class-validator";

export class Product {
  @ApiProperty()
  sku: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  @Min(0)
  @Max(999999999)
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  categories: string[];
  
  @ApiProperty()
  @Min(0)
  @Max(999999999)
  stock: number;
}