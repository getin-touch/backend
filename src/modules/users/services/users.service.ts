import { Injectable } from '@nestjs/common';

import LoggerService from '@infra/logger/services';
import { UsersRepository } from '../dataAccess/repositories';

@Injectable()
class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('UsersService');
  }
}

export default UsersService;
