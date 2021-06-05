import { Controller } from '@nestjs/common';

import UsersService from '../../services';

@Controller('users')
class UsersController {
  constructor(private readonly usersService: UsersService) {}
}

export default UsersController;
