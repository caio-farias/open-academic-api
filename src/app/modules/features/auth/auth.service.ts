import { Injectable } from '@nestjs/common';
import { JwtAuthService } from '../../common/jwt-auth/jwt-auth.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtAuthService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    if (user && user.password === password) {
      const { password, ...rest } = user;
      return rest;
    }
  }

  async loginAndReturnJwt(user: any) {
    return this.jwtService.login(user);
  }
}
