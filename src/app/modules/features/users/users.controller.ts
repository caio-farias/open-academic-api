import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  HttpStatus,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import statusMessages from '../../../utils/status-messages/status-messages';
import { JwtAuthGuard } from '../../common/jwt-auth/jwt-auth.guard';
import { throwError } from 'src/app/utils/status-messages/utils';
import { ConfigService } from '@nestjs/config';
import {
  generateFilter,
  generateNextPath,
} from 'src/app/utils/functions/functions';
import { generateUserSearchQuery } from './utils/utils';
import { UserFavoritsService } from '../user-favorits/user-favorits.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userFavoritsService: UserFavoritsService,
    private configService: ConfigService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    const user = await this.usersService.getUserById(userId);
    if (!user) throwError(HttpStatus.BAD_REQUEST, statusMessages.userNotExist);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(
    @Query('firstName') firstName: string,
    @Query('lastName') lastName: string,
    @Query('roles') roles: string[],
    @Query('education') education: string,
    @Query('expirienceTime') expirienceTime: string,
    @Query('languages') languages: string[],
    @Query('pageInit') pageInit: string,
    @Query('pageLimit') pageLimit: string,
    @Req() req,
  ): Promise<any> {
    const path = req.originalUrl;
    const url: string = this.configService.get('DEV_URL');
    const page = parseInt(pageInit) || 0;
    const filter = generateFilter(
      {
        roles,
        expirienceTime,
        'qualifications.languages': languages,
        'qualifications.education': education,
      },
      {
        firstName: { $regex: firstName || '', $options: 'i' },
        lastName: { $regex: lastName || '', $options: 'i' },
      },
      generateUserSearchQuery,
    );

    const users = await this.usersService.getUsers(filter, {
      skip: pageInit || 0,
      limit: pageLimit || 10,
    });
    const count = (await users).length;
    return {
      data: {
        count,
        users,
      },
      paging: {
        next:
          url +
          generateNextPath(
            path,
            `pageInit=${page}`,
            `pageInit=${page + count}`,
          ),
        previous: url + path,
      },
    };
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.getUserByEmail(createUserDto.email);
    if (user)
      throwError(HttpStatus.BAD_REQUEST, statusMessages.emailAlreadyInUse);
    const newUser = await this.usersService.createUser(
      createUserDto.firstName,
      createUserDto.lastName,
      createUserDto.roles,
      createUserDto.email,
      createUserDto.password,
    );
    await this.userFavoritsService.createUserFavorits(newUser.userId);
    return newUser;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.getUserById(userId);
    if (!user) throwError(HttpStatus.BAD_REQUEST, statusMessages.userNotExist);
    return this.usersService.updateUser(userId, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    const user = await this.usersService.getUserById(userId);
    if (!user) throwError(HttpStatus.BAD_REQUEST, statusMessages.userNotExist);
    await this.usersService.deleteUser(userId);
    await this.userFavoritsService.createUserFavorits(userId);
  }

  // @UseGuards(JwtAuthGuard)
  // @Patch(':userId/favorite/:favoriteUserId')
  // async favoriteUser(
  //   @Param('userId') userId: string,
  //   @Param('favoriteUserId') favoriteUserId: string,
  // ) {
  //   const user = await this.usersService.getUserById(userId);
  //   if (!user) throwError(HttpStatus.BAD_REQUEST, statusMessages.userNotExist);
  //   const favoriteUser = await this.usersService.getUserById(favoriteUserId);
  //   if (!favoriteUser)
  //     throwError(HttpStatus.BAD_REQUEST, statusMessages.favoriteUserNotExist);
  //   // if (!user.favorits.find((userId) => userId == favoriteUser.userId))
  //   //   throwError(HttpStatus.BAD_REQUEST, statusMessages.userAlreadyFavorite);
  //   return this.userFavoritsService.favoriteUser(user, favoriteUser._id);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Patch(':userId/unfavorite/:favoriteUserId')
  // async unfavoriteUser(
  //   @Param('userId') userId: string,
  //   @Param('favoriteUserId') favoriteUserId: string,
  // ) {
  //   const user = await this.usersService.getUserById(userId);
  //   if (!user) throwError(HttpStatus.BAD_REQUEST, statusMessages.userNotExist);
  //   const favoriteUser = await this.usersService.getUserById(favoriteUserId);
  //   if (!favoriteUser)
  //     throwError(HttpStatus.BAD_REQUEST, statusMessages.favoriteUserNotExist);
  //   if (!user.favorits.find((userId) => userId == favoriteUser.userId))
  //     throwError(HttpStatus.BAD_REQUEST, statusMessages.userAlreadyUnfavorite);
  //   return this.userFavoritsService.unfavoriteUser(user, favoriteUser._id);
  // }
}
