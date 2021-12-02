import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from '@components/user/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async findALl(@Query('offset') offset: number, @Query('limit') limit: number) {
    const users = await this.userService.getUsersFromDb(offset, limit);

    return users;
  }
}
