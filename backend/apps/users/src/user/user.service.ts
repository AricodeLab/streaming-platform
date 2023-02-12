import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto';
import { User } from '@app/common/db/entity';
@Injectable()
export class UserService {
  constructor() {}

  async createUser(request: CreateUserDto) : Promise<Object> {
    await this.validateCreateUserRequest(request);
    const user = await User.create({
      ...request,
      password: await bcrypt.hash(request.password, 10),
    });
    user.save()
    return {msg : "User created"}
  }

  private async validateCreateUserRequest(request: CreateUserDto) {
    let user: User;
      user = await User.findOneBy({"email":request.email})
   

    if (user) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  async validateUser(email: string, password: string) {
    const user = await User.findOneBy({"email":email})
 
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    
    return user;
  }

  async getUser(userId: number) {

    const user = await User.findOneBy({"id": userId});
    if (!user){
      return {"msg":"user not found"}
    }
    return user
  }
}
