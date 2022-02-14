import { enumEducationFromString } from 'src/app/utils/strings/enums';

export const generateUserSearchQuery = (query, value) => {
  switch (query) {
    case 'expirienceTime':
      return { $lte: value };
    case 'roles':
      return { $elemMatch: { $in: value } };
    case 'qualifications.languages':
      return { $elemMatch: { $in: value } };
    case 'qualifications.education':
      return { [enumEducationFromString(value)]: { $size: { $gte: 1 } } };
  }
};
