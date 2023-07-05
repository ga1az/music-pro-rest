import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
    @ApiProperty()
    @IsNotEmpty()
    @Type(() => String)
    username: string;
    @ApiProperty()
    @IsNotEmpty()
    @Type(() => String)
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @Type(() => String)
    email: string;
}

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    email: string;
}
