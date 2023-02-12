import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';


import { User } from '@app/common/db/entity';
@Injectable()
export class UserService {
  constructor() {}

 

  async validateUser(email: string, password: string) {
   
    const user = await User.findOneBy({"email":email})
    
    const passwordIsValid = await bcrypt.compare(password, user?.password || "");

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
