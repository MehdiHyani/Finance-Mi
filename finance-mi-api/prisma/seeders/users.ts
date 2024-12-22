import { Prisma } from '@prisma/client';
import { hash } from 'argon2';

export const getUsers = async (): Promise<Prisma.UserCreateManyInput[]> => {
  return [
    {
      email: 'john.doe@example.com',
      password: await hash('Johndoe123'),
      firstName: 'John',
      lastName: 'Doe',
    },
  ];
};
