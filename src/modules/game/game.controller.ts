import { Body, Controller, Post } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  // TODO: add authentication guard
  @Post()
  create(@Body() body: CreateGameDto) {
    return this.gameService.create(body);
  }
}
