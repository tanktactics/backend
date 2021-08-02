import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { Controller, Post, Query, UseGuards, Version } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Post('search')
  search(@Query('query') query: string) {
    return this.userService.search(query);
  }
}
