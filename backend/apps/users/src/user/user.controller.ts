import { Body, Controller, Get, Post } from '@nestjs/common';
import { type } from 'os';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';



@Controller('auth/users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get("/<id>")
  async getUser(id: number){
    return this.getUser(id)
  }
  @Post()
  async createUser(@Body() request: CreateUserDto) {
    return this.usersService.createUser(request);
  }
}