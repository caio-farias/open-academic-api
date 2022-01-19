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

  @Prop()
  birthDate: string;

  @Prop([String])
  roles: string[];

  @Prop()
  profilePhoto: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  grade: number;

  @Prop({ default: 0 })
  productionsCount: number;

  @Prop()
  expirienceTime: string;

  @Prop({
    default: [
      {
        socialNetwork: 'Linkedin',
        link: '',
      },
      {
        socialNetwork: 'Escavador',
        link: '',
      },
      {
        socialNetwork: 'Lattes',
        link: '',
      },
    ],
  })
  socialLinks: [{ socialNetwork: string; link: string }];

  @Prop([String])
  favorits: string[];

  @Prop({
    default: {
      languages: [],
      interests: [],
      education: {
        gradDegrees: [],
        masterDegress: [],
        phdDegrees: [],
        specializations: [],
      },
    },
  })
  qualifications: Qualifications;

  getEmail() {
    return this.email;
  }
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
