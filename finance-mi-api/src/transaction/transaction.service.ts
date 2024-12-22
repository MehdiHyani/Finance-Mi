import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma.service';
import { ListTransactionQueryDto } from './dto/list-transaction-query.dto';
import { PaymentMethodEnum } from '@prisma/client';
import * as ss from 'simple-statistics';
import * as dayjs from 'dayjs';

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    {
      amount,
      date,
      description,
      paymentMethod,
      category,
    }: CreateTransactionDto,
    userId: string,
  ) {
    return this.prismaService.transaction.create({
      data: {
        amount,
        date,
        description,
        Category: {
          connect: {
            name: category,
          },
        },
        paymentMethod,
        User: {
          connect: {
            id: userId,
          },
        },
      },
      select: {
        id: true,
      },
    });
  }

  async findAll(query: ListTransactionQueryDto, userId: string) {
    const transactions = await this.prismaService.transaction.findMany({
      where: {
        amount: {
          lte: query.maxAmount ? +query.maxAmount : undefined,
          gte: query.minAmount ? +query.minAmount : undefined,
        },
        date: {
          lte: query.before,
          gte: query.after,
        },
        categoryName: {
          in: query.category?.split(','),
        },
        paymentMethod: {
          in: query.paymentMethod?.split(',') as PaymentMethodEnum[],
        },
        userId,
        description: {
          contains: query.search,
          mode: 'insensitive',
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      page: query.page,
      pageSize: query.pageSize,
      count: transactions.length,
      results: transactions.slice(
        (query.page - 1) * query.pageSize,
        query.page * query.pageSize,
      ),
    };
  }

  async getListFiltersParameters(userId: string) {
    const transactions = await this.prismaService.transaction.findMany({
      where: {
        userId,
      },
    });

    const amountRange = [null, null];

    for (const transaction of transactions) {
      if (amountRange[0] === null || transaction.amount < amountRange[0])
        amountRange[0] = Math.floor(transaction.amount);
      if (amountRange[1] === null || transaction.amount > amountRange[1])
        amountRange[1] = Math.ceil(transaction.amount);
    }

    return {
      minAmount: amountRange[0],
      maxAmount: amountRange[1],
    };
  }

  findOne(id: string) {
    return this.prismaService.transaction.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return this.prismaService.transaction.update({
      where: { id },
      data: updateTransactionDto,
      select: {
        id: true,
      },
    });
  }

  remove(id: string) {
    return this.prismaService.transaction.delete({ where: { id } });
  }

  async getConsumptionTrends(days: number, userId: string) {
    const startDate = dayjs().subtract(days, 'days').startOf('day').toDate();

    try {
      // Fetch raw transactions data from the database
      const transactions = await this.prismaService.transaction.findMany({
        where: {
          date: {
            gte: startDate, // Filter transactions from the start date
          },
          userId, // Filter by userId
        },
        select: {
          date: true,
          amount: true,
        },
      });

      // Aggregate transactions manually by day
      const aggregated = transactions.reduce(
        (acc, transaction) => {
          const dateKey = dayjs(transaction.date)
            .startOf('day')
            .format('YYYY-MM-DD');
          if (!acc[dateKey]) {
            acc[dateKey] = 0;
          }
          acc[dateKey] += transaction.amount || 0;
          return acc;
        },
        {} as Record<string, number>,
      );

      console.log(aggregated);

      // Map the aggregated results to the desired format and sort by date
      return Object.entries(aggregated)
        .map(([date, totalAmount]) => ({
          date,
          totalAmount,
        }))
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        ); // Sort by date ascending
    } catch (error) {
      console.log(error);
      // Return an empty array in case of errors
      return [];
    }
  }

  async getConsumptionStatistics(days: number, userId: string) {
    // Fetch consumption trends
    const trends = await this.getConsumptionTrends(days, userId);

    const result = {
      total: 0,
      minConsumption: { date: null, amount: 0 },
      maxConsumption: { date: null, amount: 0 },
    };

    for (const trend of trends) {
      result.total += trend.totalAmount;
      if (trend.totalAmount < result.minConsumption.amount) {
        result.minConsumption.date = trend.date;
        result.minConsumption.amount = trend.totalAmount;
      }
      if (trend.totalAmount > result.maxConsumption.amount) {
        result.maxConsumption.date = trend.date;
        result.maxConsumption.amount = trend.totalAmount;
      }
    }

    return result;
  }

  async forecastTransactions(_days: number, userId: string) {
    const days = 15; // Number of days to forecast
    // Get historical trends
    const trends = await this.getConsumptionTrends(days, userId);

    if (trends.length === 0) {
      // Return default forecast with zero amounts if no transactions found
      return Array.from({ length: days }, (_, i) => ({
        date: dayjs()
          .add(i + 1, 'day')
          .format('YYYY-MM-DD'),
        predictedAmount: 0,
      }));
    }

    // Prepare data for regression
    const data = trends.map((trend, index) => [index, trend.totalAmount]); // Use index as the X value

    // Generate regression model
    const regression = ss.linearRegression(data);
    const predict = ss.linearRegressionLine(regression);

    // Find the starting index for forecasting (after trends)
    const startIndex = trends.length;

    // Generate forecasts for the next X days
    const forecast = Array.from({ length: days }, (_, i) => {
      const futureIndex = startIndex + i; // Index for future days
      return {
        date: dayjs()
          .add(i + 1, 'day') // Start from tomorrow and go forward
          .format('YYYY-MM-DD'),
        predictedAmount: Math.max(0, predict(futureIndex)), // Ensure non-negative predictions
      };
    });

    return forecast;
  }
}
