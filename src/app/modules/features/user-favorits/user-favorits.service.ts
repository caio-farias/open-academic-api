import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { UpdateUserFavoritsDto } from './dto/update-user-favorits-dto';
import { UserFavoritsRepository } from './user-favorits.repository';
import { UserFavorits } from './user-favorits.schema';

@Injectable()
export class UserFavoritsService {
  constructor(
    private readonly userFavoritsRepository: UserFavoritsRepository,
  ) {}

  async getUserFavoritsById(userId: string): Promise<UserFavorits> {
    return this.userFavoritsRepository.findOne({ userId });
  }

  async createUserFavorits(userId: string): Promise<UserFavorits> {
    return this.userFavoritsRepository.create({ userId });
  }

  async favoriteUser(user: User, favoriteUserId: Types.ObjectId) {
    const userFavorits = await this.getUserFavoritsById(user.userId);
    const update = new UpdateUserFavoritsDto();
    console.log(favoriteUserId);
    userFavorits.favorits.push(favoriteUserId);
    update.favorits = userFavorits.favorits;
    return this.updateUserFavorits(user.userId, update);
  }

  async unfavoriteUser(user: User, favoriteUserId: Types.ObjectId) {
    const update = new UpdateUserFavoritsDto();
    update.favorits = update.favorits.filter(
      (userId) => userId != favoriteUserId,
    );
    return this.updateUserFavorits(user.userId, update);
  }

  async updateUserFavorits(
    userId: string,
    userUpdates: UpdateUserFavoritsDto,
  ): Promise<UserFavorits> {
    const userFavorits = await this.userFavoritsRepository.findOneAndUpdate(
      { userId },
      userUpdates,
    );
    return userFavorits;
  }

  async deleteUserFavorits(userId: string): Promise<boolean> {
    return this.userFavoritsRepository.deleteOne({ userId });
  }
}
