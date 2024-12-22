import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiBody } from '@nestjs/swagger';
import { SignInBody } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: SignInBody })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    return req.logout();
  }
}
