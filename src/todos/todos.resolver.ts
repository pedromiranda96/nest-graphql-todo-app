import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CurrentUser } from 'src/auth/decorators/graphql/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/graphql.guard';

import { CreateTodoInput } from './input/create-todo.input';
import { Todo } from './todo';
import { TodosService } from './todos.service';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Todo)
  async createTodo(@Args('data') data: CreateTodoInput, @CurrentUser() user) {
    return this.todosService.createTodo({
      ...data,
      userId: user.id,
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Todo)
  async markTodoAsDone(@Args('todoId') todoId: string, @CurrentUser() user) {
    return this.todosService.markTodoAsDone({
      userId: user.id,
      todoId,
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Todo)
  async deleteTodo(@Args('todoId') todoId: string, @CurrentUser() user) {
    return this.todosService.deleteTodo({
      userId: user.id,
      todoId,
    });
  }
}
