import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../users.service';
import { UserService } from '../user/user.service';
import ConfigJWT from "@app/common/config/jwt.config"
@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UserService,
  ) {
    
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          const cookie: String = request.headers.cookie
          console.log(cookie.split("=")[1])
          return cookie.split("=")[1]
        },
      ]),
      secretOrKey: ConfigJWT['JWT_SECRET'],
    });
  }

  async validate({ userId }: TokenPayload) {
    try {
      return await this.usersService.getUser(+userId);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}