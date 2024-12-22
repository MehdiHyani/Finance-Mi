import { Injectable } from '@nestjs/common';
import { verify } from 'argon2';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';
import { omit } from 'lodash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne({ email: username });

    if (!user) return null;

    const isPasswordValid = await verify(user.password, password);

    if (!isPasswordValid) return null;

    return omit(user, 'password');
  }

  async login({ id }: Omit<User, 'password'>) {
    const payload = { id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
