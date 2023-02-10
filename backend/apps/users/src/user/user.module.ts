import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "@app/common/db/entity";
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CommonModule } from "@app/common"
import { DBModule } from '@app/common/db/db.module';
import {UserRepository} from "@app/common/db/db.User.repo"

@Module({
  imports: [TypeOrmModule.forFeature([User]), CommonModule,DBModule],
  providers: [UserService,UserRepository],
  controllers: [UserController],
})
export class UserModule {}