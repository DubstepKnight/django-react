import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      return this.prisma.user.create({ data });
    } catch (error) {
      return error;
    }
  }

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { email: email },
    });
  }

  async findById(id: number): Promise<User> {
    try {
      return this.prisma.user.findFirst({
        where: { id: id },
      });
    } catch (error) {
      return error;
    }
  }

  async updateUser(userId: number, data: any) {
    return this.prisma.user.update({ where: { id: userId }, data: data });
  }
}
