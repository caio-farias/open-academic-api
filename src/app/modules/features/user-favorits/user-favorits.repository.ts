import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../../../repositories/entity.repository';
import { UserFavorits, UserFavoritsDocument } from './user-favorits.schema';

@Injectable()
export class UserFavoritsRepository extends EntityRepository<UserFavoritsDocument> {
  constructor(
    @InjectModel(UserFavorits.name)
    private userFavoritsModel: Model<UserFavoritsDocument>,
  ) {
    super(userFavoritsModel);
  }
}
