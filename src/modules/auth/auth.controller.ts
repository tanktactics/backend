import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() body) {
    return this.authService.signUp(body);
  }

  @Post('signin')
  signIn(@Body() body) {
    return this.authService.signIn(body);
  }
}
