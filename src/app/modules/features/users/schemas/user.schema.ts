import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import Qualifications from './qualifications.schema';

@Schema({ toJSON: { getters: true }, toObject: { getters: true } })
export class User {
  @Prop({ get: (v) => v })
  userId: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ default: null })
  birthDate: string;

  @Prop({ type: [String], default: [] })
  roles: string[];

  @Prop({ default: null })
  profilePhoto: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: null })
  grade: number;

  @Prop({ default: 0 })
  productionsCount: number;

  @Prop({ default: null })
  expirienceTime: number;

  @Prop({
    default: [
      {
        socialNetwork: 'Linkedin',
        link: null,
      },
      {
        socialNetwork: 'Escavador',
        link: null,
      },
      {
        socialNetwork: 'Lattes',
        link: null,
      },
    ],
  })
  socialLinks: [{ socialNetwork: string; link: string }];

  @Prop({ type: [String], default: [] })
  favorits: string[];

  @Prop({
    default: {
      languages: [],
      interests: [],
      education: {
        gradDegrees: [],
        masterDegrees: [],
        phdDegrees: [],
        specializations: [],
      },
    },
  })
  qualifications: Qualifications;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
