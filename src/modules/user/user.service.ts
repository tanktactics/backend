import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * @param  {string} username
   * @param  {string} email
   * @param  {string} password
   * @returns {User}
   * @description creates a user
   */
  async create(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        email,
        password,
        username,
      },
    });

    return user;
  }
}
