import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UsersController from './presentation/controllers';
import UsersService from './services';
import LoggerService from '../../infra/logger/services';
import { User } from './dataAccess/entities';
import { UsersRepository } from './dataAccess/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository, 
    LoggerService,
  ],
})
class UsersModule {}

export default UsersModule;
