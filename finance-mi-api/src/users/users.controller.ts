import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, GetCurrenUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  async create(@Body() data: CreateUserDto) {
    try {
      return await this.usersService.create(data);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      )
        throw new HttpException(
          'A user already exists with those credentials',
          HttpStatus.BAD_REQUEST,
        );
      else throw error;
    }
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiResponse({ type: GetCurrenUserDto })
  getProfile(@Request() req) {
    const userId = req.user.id as string;
    return this.usersService.findOne({ id: userId }, ['password']);
  }
}
