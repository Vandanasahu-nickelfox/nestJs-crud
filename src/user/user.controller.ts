// user.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() user: UserDto) {
    return this.userService.createUser(user); 
  }

  @Get()
  public async getAllUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  public async getUser(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }
}


