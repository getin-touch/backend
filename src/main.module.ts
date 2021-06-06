import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

import { CONFIG, ENV_TYPES } from './config/constants';
import { prodConf, devConf } from './config';
import UsersModule from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        process.env.NODE_ENV === ENV_TYPES.DEV
          ? devConf
          : prodConf
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => (
        configService.get(CONFIG.DATABASE)
      ), 
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => (
        configService.get(CONFIG.GRAPHQL)
      ), 
    }),
    UsersModule,
  ],
})
class MainModule {}

export default MainModule;
