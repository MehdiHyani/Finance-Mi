import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethodEnum } from '@prisma/client';

export class TransactionDto {
  @ApiProperty({
    description: 'The description of the transaction',
    example: 'Payment for services rendered',
  })
  description: string;

  @ApiProperty({
    description: 'The unique identifier of the transaction',
    example: '12345-abcde',
  })
  id: string;

  @ApiProperty({
    description: 'The amount of the transaction',
    example: 150.75,
  })
  amount: number;

  @ApiProperty({
    description: 'The date when the transaction occurred',
    example: '2023-11-01T15:30:00.000Z',
  })
  date: Date;

  @ApiProperty({
    description: 'The payment method used for the transaction',
    example: PaymentMethodEnum.creditCard,
  })
  paymentMethod: PaymentMethodEnum;

  @ApiProperty({
    description: 'The date when the transaction was created',
    example: '2023-10-30T10:15:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the transaction was last updated',
    example: '2023-11-01T16:45:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The ID of the user associated with the transaction',
    example: 'user-12345',
  })
  userId: string;

  @ApiProperty({
    description: 'The name of the category associated with the transaction',
    example: 'Utilities',
  })
  categoryName: string;
}
