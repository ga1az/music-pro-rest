import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, Length, Max } from "class-validator";

export class CreateProductDto{
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Max(999)
  sku: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Max(99999999)
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  @Length(1, 50, { each: true })
  categories: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Max(99999)
  stock: number;
}