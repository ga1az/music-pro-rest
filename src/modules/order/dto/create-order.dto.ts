import { IsArray, IsNotEmpty, IsNumber, IsString, Matches, Max, Min, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

class ProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  sku: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ type: () => [ProductDto] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{7,8}-[\dkK]$/, { message: 'El RUT no tiene el formato correcto' })
  rut: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  branchCode: number;
}
