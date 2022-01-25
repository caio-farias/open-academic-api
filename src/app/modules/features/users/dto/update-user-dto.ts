import Qualifications from '../schemas/qualifications.schema';

export class UpdateUserDto {
  firstName: string;
  lastName: string;
  roles: string[];
  birthDate: string;
  profilePhoto: string;
  expirienceTime: string;
  socialLinks: [{ socialNetwork: string; link: string }];
  favorits: string[];
  qualifications: Qualifications;
}
