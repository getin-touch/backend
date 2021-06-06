import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@modules/users/dataAccess/entities';

@Injectable()
export class UsersRepository {
  private readonly alias: string;

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {
    this.alias = 'user';
  }
}
