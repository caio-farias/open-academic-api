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

  async getUsers(query): Promise<User[]> {
    return this.usersRepository.find(query);
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async createUser(
    firstName: string,
    lastName: string,
    roles: string[],
    email: string,
    password: string,
  ): Promise<User> {
    return this.usersRepository.create({
      userId: uuid(),
      firstName,
      lastName,
      roles,
      email,
      password,
    });
  }

  async findOrCreate(maybeUser: any): Promise<User> {
    const user = this.getUserByEmail(maybeUser.email);
    if (user) return user;
    const { firstName, lastName, roles, email, password } = maybeUser;
    return this.usersRepository.create({
      userId: uuid(),
      firstName,
      lastName,
      roles,
      email,
      password,
    });
  }

  async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
  }

  async deleteUser(userId: string) {
    return this.usersRepository.deleteOne({ userId });
  }
}
