import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { JwtAuthGuard } from '../auth/jwt.guard'; // Import JwtAuthGuard

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Protect the create route
  public async create(@Body() user: UserDto) {
    return this.userService.createUser(user); 
  }

  @Get()
  @UseGuards(JwtAuthGuard) // Protect the getAllUsers route
  public async getAllUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard) // Protect the getUser route
  public async getUser(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }
}



