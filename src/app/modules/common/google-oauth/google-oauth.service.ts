import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleOAuthService {
  async googleLogin(req) {
    return req.user;
  }
}
