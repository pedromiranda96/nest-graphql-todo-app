import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field()
  title: string;

  @Field(() => Date)
  date: Date;
}
