import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserFavoritsController } from './user-favorits.controller';
import { UserFavoritsRepository } from './user-favorits.repository';
import { UserFavorits, UserFavoritsSchema } from './user-favorits.schema';
import { UserFavoritsService } from './user-favorits.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserFavorits.name, schema: UserFavoritsSchema },
    ]),
  ],
  controllers: [UserFavoritsController],
  providers: [UserFavoritsService, UserFavoritsRepository],
  exports: [UserFavoritsService],
})
export default class UserFavoritsModule {}
