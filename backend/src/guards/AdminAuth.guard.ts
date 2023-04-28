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
    console.log(request)

    const user = request.user;
    console.log('opa adm');
    console.log(user);
    return user && user.email === 'e@gmail.com';
  }
}
