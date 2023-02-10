import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('auth/')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async a() {
    return 'a';
  }

  @Get('/:id')
  async getUser(@Param("id") id: number) {
    return await this.userService.getUser(id);
  }
  @Post()
  async createUser(@Body() request: CreateUserDto) {
    return this.userService.createUser(request);
  }
}
