import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CurrentUser } from './currentUser.decorator';
import { JwtAuthGuard, LocalAuthGuard } from "./guards"

import { User } from '@app/common/db/entity';

@Controller('auth')
export class UsersController {
  constructor(private readonly authService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user: User) {
    return user;
  }
}