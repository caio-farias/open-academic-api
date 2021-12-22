import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import UsersModule from './users/users.module';
import dbConfig from './repositories/config';

@Module({
  imports: [MongooseModule.forRoot(dbConfig), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
