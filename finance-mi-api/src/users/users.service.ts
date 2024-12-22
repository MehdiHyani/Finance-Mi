import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/users.dto';
import { hash } from 'argon2';
import { omit } from 'lodash';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(
    where: Prisma.UserFindUniqueArgs['where'],
    omit_keys: Array<keyof User> = [],
  ): Promise<Partial<User> | undefined> {
    const user = await this.prismaService.user.findUnique({
      where,
    });
    return omit(user, omit_keys);
  }

  async create(data: CreateUserDto) {
    const password = await hash(data.password);
    return this.prismaService.user.create({
      data: {
        ...data,
        password,
      },
      select: {
        id: true,
      },
    });
  }
}
