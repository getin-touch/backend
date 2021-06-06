import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { UsersService } from '@modules/users/services';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // add types
  @Mutation('signUp')
  async signUp(@Args('SignUpInput') args) {
    // return await this.usersService.signUp(args);
  }
}
