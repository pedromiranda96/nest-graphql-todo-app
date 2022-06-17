import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/shared/prisma/prisma.service';

import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser({ name, email, password }: CreateUserDTO) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      throw new Error('The given e-mail address is already registered');
    }

    return this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
