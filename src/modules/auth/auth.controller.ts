import { Body, Controller, Post, Version } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup-auth.dto';
import { SignInDto } from './dto/signin-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Version('1')
  @Post('signup')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Version('1')
  @Post('signin')
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }
}
