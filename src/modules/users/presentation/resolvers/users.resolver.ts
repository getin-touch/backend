import { Args, Mutation, Resolver } from '@nestjs/graphql';

import UsersService from '../../services';

@Resolver('User')
class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // add types
  @Mutation('signUp')
  async signUp(@Args('SignUpInput') args) {
    // return await this.usersService.signUp(args);
  }
}

export default UsersResolver;
