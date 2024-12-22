import { ApiProperty } from '@nestjs/swagger';

export class MinMaxConsumptionDto {
  @ApiProperty({ description: 'The date of the consumption' })
  date: Date;

  @ApiProperty({ description: 'The amount of the consumption' })
  amount: number;
}

export class ForecastedConsumptionDto {
  @ApiProperty({ description: 'The date of the forecasted consumption' })
  date: string;

  @ApiProperty({ description: 'The predicted consumption amount' })
  predictedAmount: number;
}

export class DashboardResponseDto {
  @ApiProperty({
    description: 'Consumptions from the previous days',
    isArray: true,
  })
  previousConsumptions: { date: string; totalAmount: number }[];

  @ApiProperty({
    description: 'Forecasted consumptions for the next days',
    isArray: true,
  })
  forecastedConsumption: ForecastedConsumptionDto[];

  @ApiProperty({ description: 'The total consumption amount' })
  total: number;

  @ApiProperty({ description: 'The minimum consumption details' })
  minConsumption: MinMaxConsumptionDto;

  @ApiProperty({ description: 'The maximum consumption details' })
  maxConsumption: MinMaxConsumptionDto;
}
