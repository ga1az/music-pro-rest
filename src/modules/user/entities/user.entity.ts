import { ApiProperty } from '@nestjs/swagger';

export class User {
    @ApiProperty()
    created_at: Date;
    @ApiProperty()
    id: number;
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    authStrategy: string;
}
