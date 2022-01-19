import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthModule } from '../jwt-auth/jwt-auth.module';
import UsersModule from '../users/users.module';
import { GoogleOAuthController } from './google-oauth.controller';
import { GoogleOAuthService } from './google-oauth.service';
import { GoogleOAuthStrategy } from './google-oauth.strategy';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtAuthModule,
  ],
  controllers: [GoogleOAuthController],
  providers: [GoogleOAuthStrategy, GoogleOAuthService],
})
export default class GoogleOAuthModule {}
