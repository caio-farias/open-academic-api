import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { throwError } from 'src/app/utils/status-messages/utils';
import statusMessages from '../../../utils/status-messages/status-messages';
import { AuthService } from './auth.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);

    if (!user) throwError(HttpStatus.UNAUTHORIZED, statusMessages.unauthorized);

    return user;
  }
}
