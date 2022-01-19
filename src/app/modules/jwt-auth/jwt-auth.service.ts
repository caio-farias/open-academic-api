import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt-auth.strategy';

@Injectable()
export class JwtAuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async loginWithGoogle(googleUser) {
    const payload: JwtPayload = {
      username: googleUser.email,
      sub: googleUser.email + googleUser.id,
    };
    const user = await this.usersService.findOrCreate(googleUser);
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async login(user) {
    const { email, userId } = user._doc;
    const payload: JwtPayload = {
      username: email,
      sub: email + userId,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: user._doc,
    };
  }
}
