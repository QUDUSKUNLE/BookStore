import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../interfaces/users.interface';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  getUsers(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  getUser(id): Promise<User> {
    return this.usersRepository.findOne(id)
  }

  async createUser(user: Users): Promise<object> {
    const { userName } = user;
    const checkUsername = await this.usersRepository.findOne({ userName });
    if (!checkUsername) {
      this.usersRepository.insert(user);
      return { message: 'User created successfully' };
    }
    return { error: 'User already exist' }
  }
}
