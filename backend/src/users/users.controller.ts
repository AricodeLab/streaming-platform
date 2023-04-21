import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard, LocalAuthGuard } from 'src/guards';
import { CurrentUser } from './currentUser.decorator';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  test(): string {
    return 'hello wold';
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: User, @Res({ passthrough: true }) response) {
    await this.usersService.login(user, response);
    response.send({ msg: 'you are login' });
  }
  @UseGuards(JwtAuthGuard)
  //get all users
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findall();
  }
  @UseGuards(JwtAuthGuard)
  //get one user
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new Error('User not found');
    } else {
      return user;
    }
  }
  @UseGuards(JwtAuthGuard)
  //create user
  @Post()
  async create(@Body() user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    return await this.usersService.create(user);
  }
  @UseGuards(JwtAuthGuard)
  //update user
  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User): Promise<User> {
    return this.usersService.update(id, user);
  }
  @UseGuards(JwtAuthGuard)
  //delete user
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    //handle the error if user not found
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    return this.usersService.delete(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getUser(@CurrentUser() user: User) {
    delete user.password;
    return user;
  }
}
