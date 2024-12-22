import { Prisma } from '@prisma/client';

export const getCategories = async (): Promise<
  Prisma.CategoryCreateManyInput[]
> => {
  return [
    {
      name: 'entertainment',
      IconUrl: '',
    },
    {
      name: 'food',
      IconUrl: '',
    },
    {
      name: 'rent',
      IconUrl: '',
    },
    {
      name: 'utilities',
      IconUrl: '',
    },
    {
      name: 'subscriptions',
      IconUrl: '',
    },
  ];
};
