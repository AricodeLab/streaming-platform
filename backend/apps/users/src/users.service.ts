import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from '@app/common/db/entity';
import * as bcrypt from 'bcrypt';
import ConfigJWT from '@app/common/config/jwt.config';
import { CreateUserDto } from '@app/common/dto';

export interface TokenPayload {
  userId: string;
}

@Injectable()
export class UsersService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: User, response: Response) {
    console.log(user);
    const tokenPayload: TokenPayload = {
      userId: user.id.toString(),
    };

    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + +ConfigJWT['JWT_EXPIRATION']);

    const token = this.jwtService.sign(tokenPayload);

    return response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
  async createUser(request: CreateUserDto): Promise<object> {
    console.log('penis');
    await this.validateCreateUserRequest(request);
    const user = User.create({
      ...request,
      password: await bcrypt.hash(request.password, 10),
    });
    user.save();
    return { msg: 'User created' };
  }

  private async validateCreateUserRequest(request: CreateUserDto) {
    const user: User = await User.findOneBy({ email: request.email });

    if (user) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }
}
