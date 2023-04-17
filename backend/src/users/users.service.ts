import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, response) {
    const tokenPayload = {
      userId: user.id.toString(),
    };

    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + +process.env.JWT_EXPIRATION);

    const token = this.jwtService.sign(tokenPayload);

    return response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
  // get all users
  async findall(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  // get one user
  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
  }
  async validateUser(email: string, password: string) {
    const user = await User.findOneBy({ email: email });

    const passwordIsValid = await bcrypt.compare(
      password,
      user?.password || '',
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }

    return user;
  }
  //create user
  async create(user: User): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  // update user
  async update(id: number, user: User): Promise<User> {
    await this.usersRepository.update(id, user);
    return await this.usersRepository.findOne({ where: { id } });
  }

  // delete user
  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
