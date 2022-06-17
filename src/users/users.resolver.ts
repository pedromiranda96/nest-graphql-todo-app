import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { CurrentUser } from 'src/auth/decorators/graphql/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/graphql.guard';
import { Todo } from 'src/todos/todo';
import { TodosService } from 'src/todos/todos.service';

import { CreateUserInput } from './input/create-user.input';
import { User } from './user';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly todosService: TodosService,
  ) {}

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput) {
    return this.usersService.createUser(data);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async me(@CurrentUser() user) {
    return this.usersService.getUserById(user.id);
  }

  @ResolveField(() => [Todo])
  async todos(@CurrentUser() user) {
    return this.todosService.getTodosByUserId(user.id);
  }
}
