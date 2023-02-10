import { Body, Controller, Get,Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController { 
constructor(private readonly userService: UsersService) {} 
@Get() 
getUsers() { return this.userService.getUsers(); }
@Post('create')  
createUsers(@Body() createUserDto: CreateUserDto) { return this.userService.createUser(createUserDto); }
}
