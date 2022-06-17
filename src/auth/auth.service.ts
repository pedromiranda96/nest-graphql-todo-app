import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user && user.password === password) {
      return { id: user.id };
    }

    return null;
  }

  async sign(userId: string) {
    return {
      accessToken: this.jwtService.sign({ sub: userId }),
    };
  }
}
