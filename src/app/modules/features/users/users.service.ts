import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { v4 as uuid } from 'uuid';
import { UpdateUserDto } from './dto/update-user-dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(userId: string): Promise<User> {
    return this.usersRepository.findOne({ userId });
  }

  async getUsers(query, options): Promise<User[]> {
    return this.usersRepository.find(query, options);
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async getUserByEmailWithPassword(email: string): Promise<User> {
    return this.usersRepository.findOneWithPassword({ email });
  }

  async createUser(
    firstName: string,
    lastName: string,
    roles: string[],
    email: string,
    password: string,
  ): Promise<User> {
    const user: User = await this.usersRepository.create({
      userId: uuid(),
      firstName,
      lastName,
      roles,
      email,
      password,
    });

    return user;
  }

  async findOrCreate(maybeUser: any): Promise<User> {
    const user = await this.getUserByEmail(maybeUser.email);
    if (user) return user;
    const { firstName, lastName, email, picture } = maybeUser;
    const newUser = await this.usersRepository.create({
      userId: uuid(),
      firstName,
      lastName,
      email,
      password: email,
      profilePhoto: picture,
    });
    return newUser;
  }

  async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneAndUpdate(
      { userId },
      userUpdates,
    );
    return user;
  }

  async deleteUser(userId: string) {
    return this.usersRepository.deleteOne({ userId });
  }
}
