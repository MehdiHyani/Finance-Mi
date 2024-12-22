import { PrismaClient } from '@prisma/client';
import { getUsers } from './users';
import { getCategories } from './categories';
import { getTransactions } from './transactions';

export const prismaSeedClient = new PrismaClient();

async function seed() {
  console.log('Flushing DB...');
  await prismaSeedClient.user.deleteMany();
  await prismaSeedClient.category.deleteMany();
  await prismaSeedClient.transaction.deleteMany();
  console.log('DB flushed');
  console.log('Seeding users');
  await prismaSeedClient.user.createMany({
    data: await getUsers(),
    skipDuplicates: true,
  });
  console.log('Seeded users');
  console.log('Seeding categories');
  await prismaSeedClient.category.createMany({
    data: await getCategories(),
    skipDuplicates: true,
  });
  console.log('Seeded categories');
  console.log('Seeding transactions');
  await prismaSeedClient.transaction.createMany({
    data: await getTransactions(),
    skipDuplicates: true,
  });
  console.log('Seeded transactions');
  console.log('Seeding complete');
}

seed();
