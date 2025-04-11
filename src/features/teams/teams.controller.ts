import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { getScopeName } from '../../utils/string.utils';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entities/team.entity';
import { TeamsService } from './teams.service';

const scope = getScopeName(Team.name);

@ApiTags(scope)
@Controller(scope.toLowerCase())
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  @ApiOperation({
    summary: 'Gets all teams',
  })
  getTeams() {
    return this.teamsService.getTeams();
  }

  @Get(':code')
  @ApiOperation({
    summary: 'Gets the team given its code',
  })
  @ApiParam({
    name: 'code',
    type: 'string',
    required: true,
    description: 'The code of the team',
    example: '793da735-c1f7-4942-822c-9f7a7a3a842b',
  })
  getTeam(@Param('code') code: string) {
    return this.teamsService.getTeam(code);
  }

  @Post()
  @ApiOperation({
    summary: 'Creates a new team',
  })
  createTeam(@Body() dto: CreateTeamDto) {
    return this.teamsService.createTeam(dto);
  }

  @Patch(':code')
  @ApiOperation({
    summary: 'Updates the team given its code',
  })
  updateTeam(@Param('code') code: string, @Body() dto: CreateTeamDto) {
    return this.teamsService.updateTeam(code, dto);
  }
}
