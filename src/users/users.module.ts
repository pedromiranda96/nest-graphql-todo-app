import { Module } from '@nestjs/common';

import { SharedModule } from 'src/shared/shared.module';
import { TodosModule } from 'src/todos/todos.module';

import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [SharedModule, TodosModule],
})
export class UsersModule {}
