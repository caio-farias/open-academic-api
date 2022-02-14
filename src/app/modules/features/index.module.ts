import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import UserFavoritsModule from './user-favorits/user-favorits.module';
import UsersModule from './users/users.module';

@Module({
  imports: [UsersModule, AuthModule, UserFavoritsModule],
  exports: [UsersModule, AuthModule, UserFavoritsModule],
})
export default class Features {}
