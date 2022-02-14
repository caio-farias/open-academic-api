import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import UserFavoritsModule from '../user-favorits/user-favorits.module';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserFavoritsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export default class UsersModule {}
