import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import dbURI from 'src/repositories/config';
import GoogleOAuthModule from './google-oauth/google-oauth.module';

@Module({
  imports: [MongooseModule.forRoot(dbURI), GoogleOAuthModule],
  exports: [MongooseModule, GoogleOAuthModule],
})
export default class CommonModule {}
