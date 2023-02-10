import { Module } from '@nestjs/common';
import { UserRepository } from './db.User.repo';
import {TypeOrmModule} from "@nestjs/typeorm/";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UserRepository],
})
export class DBModule {}
