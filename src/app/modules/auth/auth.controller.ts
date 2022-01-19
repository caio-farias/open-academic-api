import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { MainAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(MainAuthGuard)
  @Post('/login')
  async authenticate(@Req() req) {
    return this.authService.loginAndReturnJwt(req.user);
  }
}
