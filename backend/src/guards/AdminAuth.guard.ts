import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExtractJwt } from 'passport-jwt';
@Injectable()
export default class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const info = ExtractJwt.fromExtractors([
      (request: any) => {
        console.log(request.headers)
        const cookie: string = request?.headers?.cookie;

        if (!cookie) {
          throw new UnauthorizedException('No has hecho login');
        }

        const token = /Authentication=([^;]+)/.exec(cookie);

        return token[1];
      },
    ]);
    console.log(info());
    const user = request.user;
    console.log('opa adm');
    console.log(user);
    return user && user.email === 'e@gmail.com';
  }
}
