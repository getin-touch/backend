import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@modules/users/dataAccess/entities';
import { UsersRepository } from '@modules/users/dataAccess/repositories';
import { UsersService } from '@modules/users/services';
import { UsersResolver } from '@modules/users/presentation/resolvers';
import { LoggerService } from '@infra/logger/services';

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
