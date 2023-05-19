import { ApiProperty } from "@nestjs/swagger";

export class Product {
  @ApiProperty()
  sku: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  categories: string[];
  @ApiProperty()
  stock: number;
}