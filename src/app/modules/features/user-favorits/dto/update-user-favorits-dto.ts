import { Types } from 'mongoose';

export class UpdateUserFavoritsDto {
  favorits: Types.ObjectId[];
}
