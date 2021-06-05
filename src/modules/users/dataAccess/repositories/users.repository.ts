import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities';

@Injectable()
class UsersRepository {
  private readonly alias: string;

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {
    this.alias = 'user';
  }
}

export default UsersRepository;
