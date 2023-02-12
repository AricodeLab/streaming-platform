import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "@app/common/db/entity";
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DBModule } from '@app/common/db/db.module';


@Module({
  imports: [TypeOrmModule.forFeature([User]),DBModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}