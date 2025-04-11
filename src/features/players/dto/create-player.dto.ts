import { PickType } from '@nestjs/swagger';
import { Player } from '../entities/player.entity';

export class CreatePlayerDto extends PickType(Player, [
  'role',
  'teamsCaptain',
]) {}
