import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

import { CONFIG } from './config/constants';
import configuration from './config';
import UsersModule from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
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
