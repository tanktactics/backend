import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  // TODO: add argon2 hashing, but it wouldn't work on my windows machine :)
  async signUp(body) {
    const { email, password, username } = body;

    const user = await this.prisma.user.create({
      data: {
        email,
        password,
        username,
      },
    });

    return {
      token: this.jwtService.sign({
        sub: user.id,
      }),
    };
  }

  async signIn(body) {
    const { email, password } = body;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    }

    if (password === user.password) {
      return {
        token: this.jwtService.sign({
          sub: user.id,
        }),
      };
    }

    throw new HttpException("password doesn't match", HttpStatus.FORBIDDEN);
  }
}
