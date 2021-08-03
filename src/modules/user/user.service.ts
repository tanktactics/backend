import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  /**
   * @param  {string} email
   * @returns {User}
   */
  async getByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  /**
   * @param  {string} query
   */
  async search(query: string) {
    const result = await this.prisma.user.findMany({
      where: {
        OR: [
          {
            email: { contains: query, mode: 'insensitive' },
          },
          {
            username: { contains: query, mode: 'insensitive' },
          },
        ],
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    return result;
  }

  async checkUsernameAvailability(username: string) {
    const result = await this.prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    });

    if (!result) {
      return {
        available: true,
      };
    }

    return {
      available: false,
    };
  }
}
