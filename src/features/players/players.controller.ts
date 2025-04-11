import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticatedRequest } from '../../types/request.type';
import { getScopeName } from '../../utils/string.utils';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player, PlayerCode } from './entities/player.entity';
import { PlayersService } from './players.service';

const scope = getScopeName(Player.name);

@ApiTags(scope)
@Controller(scope.toLowerCase())
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  @ApiOperation({
    summary: 'Gets the  list of players',
  })
  getPlayers() {
    return this.playersService.getPlayers();
  }

  @Get(':code')
  @ApiOperation({
    summary: 'Get the playe given its code',
  })
  @ApiParam({
    name: 'code',
    type: 'string',
    description: 'The player code identifier',
    required: true,
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  getPlayer(@Param('code') code: PlayerCode) {
    return this.playersService.getPlayer(code);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Creates a new player for the authenticated user',
  })
  createMe(
    @Request() request: AuthenticatedRequest,
    @Body() dto: CreatePlayerDto,
  ) {
    return this.playersService.createMe(request.user, dto);
  }
}
