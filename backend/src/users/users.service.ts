import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, response: Response): Promise<[string,Response]> {

    const tokenPayload = {
      userId: user.id.toString(),
    };
  
    if (user.plazo.getTime() > new Date().getTime()){
      throw new UnauthorizedException('Cuenta con plazo vencido');
    }
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + +process.env.JWT_EXPIRATION);

    const token = this.jwtService.sign(tokenPayload);
    
    return [token ,response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    })];
  }
  

  async validateUser(email: string, password: string) {
    const user = await User.findOneBy({ email: email });

    const passwordIsValid = password == user.password
   
    if (!passwordIsValid) {
      throw new UnauthorizedException('Email o contrasena equivocada.');
    }

    return user;
  }
  
  // get all users
  async findall(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  // get one user
  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
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
