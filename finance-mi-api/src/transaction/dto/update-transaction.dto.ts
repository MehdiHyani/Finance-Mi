import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {}

export class UpdateTransactionResponseDto {
  @ApiProperty({ description: 'Id of the updated transaction' })
  id: string;
}
