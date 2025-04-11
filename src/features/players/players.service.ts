import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player, PlayerCode } from './entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playersRepository: MongoRepository<Player>,
  ) {}

  /**
   * Gets the list of players
   * @returns list of players
   */
  getPlayers() {
    return this.playersRepository.find();
  }
  /**
   * Gets a player by its code
   * @param playerCode player code identifier
   * @returns player by code
   */
  getPlayer(playerCode: PlayerCode) {
    return this.playersRepository.findOneBy({ code: playerCode });
  }

  /**
   * Creates a new player for the authenticated user
   * @param user authenticated user
   * @param dto player data
   */
  async createMe(user: User, dto: CreatePlayerDto) {
    const newPlayer = new Player(dto);
    await this.playersRepository.save({ ...newPlayer, user });
  }
}
