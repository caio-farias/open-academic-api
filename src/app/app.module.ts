import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import UsersModule from '../app/modules/users/users.module';
import dbConfig from '../repositories/config';
import GoogleOAuthModule from '../app/modules/google-oauth/google-oauth.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(dbConfig),
    UsersModule,
    GoogleOAuthModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export default class AppModule {}
