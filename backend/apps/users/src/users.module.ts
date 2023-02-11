import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { DBModule} from '@app/common/db/db.module';
import { JwtStrategy,LocalStrategy} from './strategies/';
import { UserModule } from './user/user.module';

import { UserService } from './user/user.service';
import ConfigJWT from "@app/common/config/jwt.config"
@Module({
  imports: [
    DBModule,
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: ConfigJWT['JWT_SECRET'],
        signOptions: {
          expiresIn: `${ConfigJWT['JWT_EXPIRATION']}`,
        },
      }),

    }),
    
  ],
  controllers: [UsersController],
  providers: [UsersService,UserService,LocalStrategy,JwtStrategy],
})
export class UsersModule {}



