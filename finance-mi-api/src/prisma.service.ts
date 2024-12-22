import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { hash, needsRehash } from 'argon2';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  constructor() {
    super();
    // Use $extends to add middleware for password hashing
    this.$extends({
      query: {
        user: {
          async create({ args, query }) {
            args.data.password = await hash(args.data.password);

            return await query(args);
          },
          async update({ args, query }) {
            if (!args.data.password === undefined) return await query(args);

            if (
              typeof args.data.password === 'string' &&
              needsRehash(args.data.password)
            ) {
              args.data.password = await hash(args.data.password);
            } else if (
              typeof args.data.password !== 'string' &&
              needsRehash(args.data.password.set)
            ) {
              args.data.password.set = await hash(args.data.password.set);
            }
            return await query(args);
          },
        },
      },
    });
  }
}
