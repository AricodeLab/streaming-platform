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
          console.log("comecou")
          if(!cookie){
            throw new UnauthorizedException("No has hecho login");
          }
          console.log("pego o cookie")
          const token = /Authentication=([^;]+)/.exec(cookie)
          console.log("cookie valido")
          console.log(token[1])
          return token[1]
        },
      ]),
      
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate({ userId }: TokenPayload) {
    console.log("foi")
    try {
      
      return await this.usersService.findOne(+userId);
    } catch (err) {
      throw new UnauthorizedException("Email o contrasena invalido");
    }
  }
}
