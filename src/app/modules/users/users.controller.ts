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
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import statusMessages from '../common/status-messages/status-messages';
import { throwError } from '../common/utils';
import { JwtAuthGuard } from '../jwt-auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
    @Query('role') role: string,
    @Query('education') education: string,
    @Query('expirience') expirience: string,
    @Query('pageInit') pageInit: number,
    @Query('pageLimit') pageLimit: number,
  ): Promise<User[]> {
    return this.usersService.getUsers({
      firstName,
      lastName,
      role,
      education,
      expirience,
      pageInit,
      pageLimit,
    });
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.getUserByEmail(createUserDto.email);
    if (user)
      throwError(HttpStatus.BAD_REQUEST, statusMessages.emailAlreadyInUse);
    return this.usersService.createUser(
      createUserDto.firstName,
      createUserDto.lastName,
      createUserDto.roles,
      createUserDto.email,
      createUserDto.password,
    );
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
    this.usersService.deleteUser(userId);
  }
}
