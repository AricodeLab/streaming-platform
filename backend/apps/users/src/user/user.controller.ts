import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';
import { CurrentUser } from '../currentUser.decorator';
import { User } from '@app/common/db/entity';
import { JwtAuthGuard } from '../guards';

@Controller('auth/')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async a() {
    return 'a';
  }
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getUser( @CurrentUser() user: User,) {
    console.log(user)
    return "a"
  }
  @Post()
  async createUser(@Body() request: CreateUserDto) {
    return this.userService.createUser(request);
  }
}
