import { Module } from '@nestjs/common';

import { SharedModule } from 'src/shared/shared.module';

import { TodosResolver } from './todos.resolver';
import { TodosService } from './todos.service';

@Module({
  providers: [TodosResolver, TodosService],
  exports: [TodosService],
  imports: [SharedModule],
})
export class TodosModule {}
