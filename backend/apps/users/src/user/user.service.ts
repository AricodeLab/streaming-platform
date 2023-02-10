import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '@app/common/db/db.User.repo';
import { CreateUserDto } from './dto';
import { User } from '@app/common/db/entity';
@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository) {}

  async createUser(request: CreateUserDto) {
    await this.validateCreateUserRequest(request);
    const user = await this.usersRepository.create({
      ...request,
      password: await bcrypt.hash(request.password, 10),
    });
    return user;
  }

  private async validateCreateUserRequest(request: CreateUserDto) {
    let user: User;
      user = await this.usersRepository.findByEmail(request.email)
   

    if (user) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findByEmail(email);
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  async getUser(userId: number) {
    return await this.usersRepository.findOne({where: {"id": userId}});
  }
}
