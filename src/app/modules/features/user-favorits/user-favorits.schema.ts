import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { User } from '../users/schemas/user.schema';

@Schema({ toJSON: { getters: true }, toObject: { getters: true } })
export class UserFavorits {
  @Prop({ get: (v) => v })
  userId: string;

  @Prop({ type: [Types.ObjectId], ref: User.name, default: [] })
  favorits: Types.ObjectId[];
}

export type UserFavoritsDocument = UserFavorits & Document;

export const UserFavoritsSchema = SchemaFactory.createForClass(UserFavorits);
