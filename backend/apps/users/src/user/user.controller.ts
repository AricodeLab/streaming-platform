import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { CurrentUser } from '../currentUser.decorator';
import { User } from '@app/common/db/entity';
import { JwtAuthGuard } from '../guards';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getUser(@CurrentUser() user: User) {
    delete user.password;
    return user;
  }
}
