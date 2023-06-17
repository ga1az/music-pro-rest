import { ApiProperty } from '@nestjs/swagger';

export class Order {
    @ApiProperty()
    date: Date;
    @ApiProperty()
    buyOrder: string;
    @ApiProperty()
    sessionId: string;
    @ApiProperty()
    status: string;
    @ApiProperty()
    rut: string;
    @ApiProperty()
    branchCode: number;
    @ApiProperty()
    products: object[];
    @ApiProperty()
    total: number;
}
