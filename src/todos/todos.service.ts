import { ForbiddenException, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/shared/prisma/prisma.service';

import { CreateTodoDTO } from './dto/create-todo.dto';
import { DeleteTodoDTO } from './dto/delete-todo.dto';
import { MarkTodoAsDoneDTO } from './dto/mark-todo-as-done.dto';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  async createTodo({ title, date, userId }: CreateTodoDTO) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return this.prisma.todo.create({
      data: {
        title,
        date,
        userId,
      },
    });
  }

  async getTodosByUserId(userId: string) {
    return this.prisma.todo.findMany({
      where: { userId },
    });
  }

  async markTodoAsDone({ userId, todoId }: MarkTodoAsDoneDTO) {
    const todo = await this.prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      throw new Error('Todo not found');
    }

    if (todo.userId !== userId) {
      throw new ForbiddenException();
    }

    return this.prisma.todo.update({
      where: { id: todoId },
      data: {
        done: true,
      },
    });
  }

  async deleteTodo({ userId, todoId }: DeleteTodoDTO) {
    const todo = await this.prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      throw new Error('Todo not found');
    }

    if (todo.userId !== userId) {
      throw new ForbiddenException();
    }

    return this.prisma.todo.delete({
      where: {
        id: todoId,
      },
    });
  }
}
