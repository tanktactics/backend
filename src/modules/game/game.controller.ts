import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { Body, Controller, Post, UseGuards, Version } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { GameService } from './game.service';

@Controller('games')
export class GameController {
  constructor(private gameService: GameService) {}

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateGameDto) {
    return this.gameService.create(body);
  }
}
