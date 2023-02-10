import { Module } from '@nestjs/common';
import { UserRepository } from './db.User.repo';
import {TypeOrmModule} from "@nestjs/typeorm/";
import { User } from './entity';
import ConfigDB from "@app/common/config/db.config"
console.log(ConfigDB['DB_PASSWORD'])
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: ConfigDB['DB_HOST'],
        port: +ConfigDB['DB_PORT'],
        username: ConfigDB['DB_USERNAME'],
        password: ConfigDB['DB_PASSWORD'],
        database: ConfigDB['DB_NAME'],
        entities: [User],
        synchronize: true,
      }),

    }),
  ],
  providers: [UserRepository],
})
export class DBModule {}
