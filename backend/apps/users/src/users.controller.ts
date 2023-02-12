import { Controller, Body, Post, Res, UseGuards } from '@nestjs/common';

import { Response } from 'express';
import { UsersService } from './users.service';
import { CurrentUser } from './currentUser.decorator';
import { JwtAuthGuard, LocalAuthGuard } from './guards';
import { CreateUserDto } from '../../../libs/common/src/dto';
import { User } from '@app/common/db/entity';

@Controller('auth')
export class UsersController {
  usersService: any;
  constructor(private readonly authService: UsersService) {}


  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.send({msg: "you are login"});
  }
  @Post("register")
  async createUser(@Body() request: CreateUserDto) {
    return this.usersService.createUser(request);
  }
}
