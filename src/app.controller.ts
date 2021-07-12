import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './components/auth/auth.service';
import { JwtAuthGuard } from './components/auth/jwt.auth.guard';
import { LocalAuthGuard } from './components/auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
