import { ApiProperty } from '@nestjs/swagger';

export class ResponseCommitTransactionDto {
    @ApiProperty()
    msg: string;
}
