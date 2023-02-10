import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}