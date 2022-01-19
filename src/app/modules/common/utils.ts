import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import statusMessages from './status-messages/status-messages';

export const throwInternalError = () => {
  throw new HttpException(
    {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: statusMessages.internalError,
    },
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
};
export const throwError = (status: HttpStatus, errorMessage: string) => {
  throw new HttpException(
    {
      status: status,
      error: errorMessage,
    },
    status,
  );
};
