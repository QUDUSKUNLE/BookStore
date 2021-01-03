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
    try {
      const newUser = await this.usersRepository.insert(user);
      return { message: 'User created successfully', id: newUser.identifiers[0].id };
    } catch (err) {
      if (err.code === '23505') {
        return { error: 'User already exist', message: err.message }
      }
      return { error: err }
    }
  }
}
