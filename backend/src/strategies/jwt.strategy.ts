import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from '../users/users.service';
interface TokenPayload {
  userId: number;
}
@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          const cookie: string = request?.headers?.cookie;

          if (!cookie) {
            throw new UnauthorizedException('No has hecho login');
          }

          const token = /Authentication=([^;]+)/.exec(cookie);

          return token[1];
        },
      ]),

      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate({ userId }: TokenPayload) {
    const user = await this.usersService.findOne(+userId);
    if (!user) {
      throw new UnauthorizedException('Gmail o contrasena invalidos');
    }

    return user;
  }
}
