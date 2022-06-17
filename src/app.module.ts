import * as path from 'path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
    }),
    AuthModule,
    UsersModule,
    TodosModule,
    SharedModule,
  ],
})
export class AppModule {}
