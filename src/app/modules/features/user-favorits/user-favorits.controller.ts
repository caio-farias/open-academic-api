import { Controller, Get, HttpStatus, Param, UseGuards } from '@nestjs/common';
import statusMessages from 'src/app/utils/status-messages/status-messages';
import { throwError } from 'src/app/utils/status-messages/utils';
import { JwtAuthGuard } from '../../common/jwt-auth/jwt-auth.guard';
import { UserFavoritsService } from './user-favorits.service';

@Controller('user-favorits')
export class UserFavoritsController {
  constructor(private userFavoritsService: UserFavoritsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getUserFavorits(@Param('userId') userId: string) {
    const userFavorits = await this.userFavoritsService.getUserFavoritsById(
      userId,
    );
    if (!userFavorits)
      throwError(HttpStatus.BAD_REQUEST, statusMessages.userNotExist);
    return userFavorits;
  }
}
