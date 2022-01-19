import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';
import { GoogleOauthGuard } from './google-oauth.guard';
import { GoogleOAuthService } from './google-oauth.service';

@Controller('auth-google')
export class GoogleOAuthController {
  constructor(
    private jwtAuthService: JwtAuthService,
    private readonly googleAuthService: GoogleOAuthService,
  ) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {
    return;
  }

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req) {
    return this.jwtAuthService.loginWithGoogle(req.user);
  }
}
