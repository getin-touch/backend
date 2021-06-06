import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UsersResolver from './presentation/resolvers';
import UsersService from './services';
import LoggerService from '../../infra/logger/services';
import { User } from './dataAccess/entities';
import { UsersRepository } from './dataAccess/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    UsersResolver,
    UsersService,
    UsersRepository, 
    LoggerService,
  ],
})
class UsersModule {}

export default UsersModule;
