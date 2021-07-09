import { Body, Controller, Post, Get } from '@nestjs/common';
import { IUser } from './interface';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() user: IUser) {
    return await this.userService.createUser(user);
  }

  @Get()
  async getUsers() {
    return await this.userService.findAllUsers();
  }
}
