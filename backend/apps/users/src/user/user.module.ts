import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "@app/common/db/entity";
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CommonModule } from "@app/common"

@Module({
  imports: [TypeOrmModule.forFeature([User]), CommonModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}