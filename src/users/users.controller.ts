import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from '../interfaces/users.interface';
import { User } from './user.entity';

@Controller('/users') 
export class UsersController {
  constructor(private readonly  usersService: UsersService) {}
  
  @Get()
  getUsers(): Promise<Users[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id): Promise<User> {
    return this.usersService.getUser(id)
  }

  @Post()
  createUser(@Body() user: Users): string {
    return this.usersService.createUser(user);
  }
}
