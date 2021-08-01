import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UserService } from '@/modules/user/user.service';
import { Player, User } from '@prisma/client';

@Injectable()
export class GameService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async create(body: CreateGameDto) {
    const { name, boardWidth, boardHeight, players } = body;

    // create a game instance
    const game = await this.prisma.game.create({
      data: {
        name,
        boardWidth: boardWidth ?? players.length * 5,
        boardHeight: boardHeight ?? players.length * 3,
        state: 'ongoing',
      },
    });

    // create a player for each user
    players.forEach(async (userId: string) => {
      const { username } = await this.userService.getById(userId);

      await this.prisma.player.create({
        data: {
          username,
          points: 0, // default points
          range: 0, // default range

          x: 0,
          y: 0,

          gameId: game.id,
        },
      });
    });

    const result = await this.prisma.game.findMany({
      include: {
        players: true,
      },
    });

    return result;
  }
}
