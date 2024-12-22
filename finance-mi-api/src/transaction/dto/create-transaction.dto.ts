import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethodEnum } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsPositive,
  IsDate,
  IsNotEmpty,
  IsEnum,
  IsString,
} from 'class-validator';
import * as dayjs from 'dayjs';

export class CreateTransactionDto {
  @IsPositive()
  @ApiProperty({ description: 'Amount of the transaction' })
  amount: number;

  @IsString()
  @ApiProperty({ description: 'Description of the transaction' })
  description: string;

  @IsDate()
  @Transform(({ value }) => dayjs(value).toDate())
  @ApiProperty({ description: 'Date of the transaction' })
  date: Date;

  @IsNotEmpty()
  @IsEnum(PaymentMethodEnum)
  @ApiProperty({
    description: 'Name of the payment method used for the transaction',
  })
  paymentMethod: PaymentMethodEnum;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the category of the transaction',
  })
  category: string;
}

export class CreateTransactionResponseDto {
  @ApiProperty({ description: 'Id of the created transaction' })
  id: string;
}
