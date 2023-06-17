import { ApiProperty } from '@nestjs/swagger';

export class ResponseCommitDto {
    @ApiProperty()
    status: string;
}
