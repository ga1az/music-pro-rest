import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
    @ApiProperty()
    @IsNotEmpty()
    @Type(() => String)
    username?: string;
    @ApiProperty()
    @IsNotEmpty()
    @Type(() => String)
    password?: string;
}

export class UpdateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @Type(() => UserDto)
    username?: string;
    @ApiProperty()
    @IsNotEmpty()
    @Type(() => UserDto)
    password?: string;
}

