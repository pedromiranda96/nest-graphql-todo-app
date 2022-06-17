import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Todo } from 'src/todos/todo';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [Todo])
  todos: Todo[];
}
