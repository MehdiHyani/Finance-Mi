import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString, Matches } from 'class-validator';
import { Paginated } from 'src/utils/customTypes';
import { TransactionDto } from './transaction.dto';

export class ListTransactionQueryDto {
  @IsOptional()
  @ApiProperty({ required: false })
  page?: number = 1;

  @IsOptional()
  @ApiProperty({ required: false })
  pageSize?: number = 25;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ required: false })
  minAmount?: string;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ required: false })
  maxAmount?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  after?: Date;

  @IsOptional()
  @ApiProperty({ required: false })
  before?: Date;

  @IsOptional()
  @IsString()
  @Matches(/^(\w+)(,\s*\w+)*$/, { message: 'Payment method invalid' })
  @ApiProperty({ required: false })
  category?: string;

  @IsOptional()
  @IsString()
  @Matches(/^(\w+)(,\s*\w+)*$/, { message: 'Payment method invalid' })
  @ApiProperty({ required: false })
  paymentMethod?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  search?: string;
}

export class ListTransactionResponseDto implements Paginated<TransactionDto> {
  @ApiProperty({ description: 'The page number of the results' })
  page: number;

  @ApiProperty({ description: 'The number of results per page' })
  pageSize: number;

  @ApiProperty({ description: 'The total number of results' })
  count: number;

  @ApiProperty({ type: [TransactionDto], description: 'The transactions' })
  results: TransactionDto[];
}

export class GetListFiltersParametersResponseDto {
  @ApiProperty({ description: 'The min amount of transactions' })
  minAmount: number | null;

  @ApiProperty({ description: 'The mac amount of transactions' })
  maxAmount: number | null;
}
