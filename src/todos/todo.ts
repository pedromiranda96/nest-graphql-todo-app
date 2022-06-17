import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => Date)
  date: Date;

  @Field()
  done: boolean;
}
