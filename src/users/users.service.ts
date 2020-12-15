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

  createUser(user: Users): string {
    this.usersRepository.insert(user);
    return 'User created successfully';
  }
}
