import { ApiProperty } from '@nestjs/swagger';

export class PutProductStock {
    @ApiProperty()
    quantity: number;
}
