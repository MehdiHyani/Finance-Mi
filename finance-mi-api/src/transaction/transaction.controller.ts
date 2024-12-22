import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import {
  CreateTransactionDto,
  CreateTransactionResponseDto,
} from './dto/create-transaction.dto';
import {
  UpdateTransactionDto,
  UpdateTransactionResponseDto,
} from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  GetListFiltersParametersResponseDto,
  ListTransactionQueryDto,
  ListTransactionResponseDto,
} from './dto/list-transaction-query.dto';
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { TransactionDto } from './dto/transaction.dto';
import { DashboardResponseDto } from './dto/dashboard.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateTransactionDto })
  @ApiResponse({ type: CreateTransactionResponseDto })
  @Post()
  create(@Request() req, @Body() createTransactionDto: CreateTransactionDto) {
    const userId = req.user.id as string;
    return this.transactionService.create(createTransactionDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: ListTransactionQueryDto })
  @ApiResponse({ type: ListTransactionResponseDto })
  @Get()
  findAll(@Request() req, @Query() query: ListTransactionQueryDto) {
    const userId = req.user.id as string;
    return this.transactionService.findAll(query, userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: GetListFiltersParametersResponseDto })
  @Get('filters-parameters')
  getListFiltersParameters(@Request() req) {
    const userId = req.user.id as string;
    return this.transactionService.getListFiltersParameters(userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    name: 'days',
    description: 'Number of days (15, 30, or 60)',
    required: true,
    enum: [15, 30, 60],
  })
  @ApiResponse({ type: DashboardResponseDto })
  @Get('dashboard')
  async getDashboardData(
    @Request() req,
    @Query('days') days: number,
  ): Promise<DashboardResponseDto> {
    const userId = req.user.id as string;

    // Fetch previous consumptions
    const previousConsumptions =
      await this.transactionService.getConsumptionTrends(days, userId);

    // Fetch forecasted consumptions
    const forecastedConsumption =
      await this.transactionService.forecastTransactions(days, userId);

    // Fetch consumption statistics
    const { total, minConsumption, maxConsumption } =
      await this.transactionService.getConsumptionStatistics(days, userId);

    // Combine data into a single response
    return {
      previousConsumptions,
      forecastedConsumption,
      total,
      minConsumption,
      maxConsumption,
    };
  }

  @Get(':id')
  @ApiResponse({ type: TransactionDto })
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateTransactionDto })
  @ApiResponse({ type: UpdateTransactionResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(id);
  }
}
