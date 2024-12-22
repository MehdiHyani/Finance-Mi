import { PaymentMethodEnum, Prisma } from '@prisma/client';
import { prismaSeedClient } from './seed';
import * as dayjs from 'dayjs';

export const getTransactions = async (): Promise<
  Prisma.TransactionCreateManyInput[]
> => {
  const users = await prismaSeedClient.user.findMany();
  const categories = await prismaSeedClient.category.findMany();

  const transactions: Awaited<Prisma.TransactionCreateManyInput[]> = [];

  for (const user of users) {
    for (const category of categories) {
      // Randomly skip some categories
      if (Math.random() > 0.5) continue;
      for (const paymentMethod of Object.values(PaymentMethodEnum)) {
        for (let idx = 0; idx < 60; idx++) {
          transactions.push({
            userId: user.id,
            paymentMethod,
            categoryName: category.name,
            amount: Math.floor(Math.random() * (500 - 30 + 1) + 30),
            date: dayjs().subtract(idx, 'day').toDate(),
            description: `Test transaction for user ${user.email} in category ${category.name}.`,
          });
        }
      }
    }
  }

  return transactions;
};
