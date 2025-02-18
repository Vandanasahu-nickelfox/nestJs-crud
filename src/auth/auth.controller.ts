import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() authDto: { email: string; password: string }) {
    return this.authService.register(authDto.email, authDto.password);
  }

  @Post('login')
  async login(@Body() authDto: { email: string; password: string }) {
    return this.authService.login(authDto.email, authDto.password);
  }
}

