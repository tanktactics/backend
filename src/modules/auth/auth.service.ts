import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup-auth.dto';
import { SignInDto } from './dto/signin-auth.dto';
import { hash, verify } from 'argon2';
import { UserService } from '@/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * @param  {SignUpDto} body
   */
  async signUp(body: SignUpDto) {
    const { email, password, username } = body;

    const user = await this.userService.create(
      username,
      email,
      await hash(password),
    );

    return {
      token: this.jwtService.sign({
        sub: user.id,
      }),
    };
  }

  /**
   * @param  {SignInDto} body
   */
  async signIn(body: SignInDto) {
    const { email, password } = body;

    const user = await this.userService.getByEmail(email);

    if (await verify(user.password, password)) {
      return {
        token: this.jwtService.sign({
          sub: user.id,
        }),
      };
    }

    throw new HttpException("passwords doesn't match", HttpStatus.FORBIDDEN);
  }
}
