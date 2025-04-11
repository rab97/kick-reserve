import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { getScopeName } from '../../utils/string.utils';
import { CreateFootballFieldDto } from './dto/create-football-field.dto';
import { UpdateFootballFieldDto } from './dto/update-football-field.dto';
import {
  FootballField,
  FootballFieldCode,
} from './entities/football-field.entity';
import { FootballFieldsService } from './football-fields.service';

const scope = getScopeName(FootballField.name);

@ApiTags(scope)
@Controller(scope.toLowerCase())
export class FootballFieldsController {
  constructor(private readonly footballFieldsService: FootballFieldsService) {}

  @Get()
  @ApiOperation({
    summary: 'Gets all football-fields',
  })
  getFootballFields() {
    return this.footballFieldsService.getFootballFields();
  }

  @Get(':code')
  @ApiOperation({
    summary: 'Gets the football-field given its code',
  })
  @ApiParam({
    name: 'code',
    type: 'string',
    required: true,
    description: 'The code of the football field',
    example: '793da735-c1f7-4942-822c-9f7a7a3a842b',
  })
  getFootballField(@Param('code') code: FootballFieldCode) {
    return this.footballFieldsService.getFootballField(code);
  }

  @Post()
  @ApiOperation({
    summary: 'Creates a new football-field',
  })
  createFootballField(@Body() dto: CreateFootballFieldDto) {
    return this.footballFieldsService.createFootballField(dto);
  }

  @Patch(':code')
  @ApiOperation({
    summary: 'Updates the football-field given its code',
  })
  @ApiParam({
    name: 'code',
    type: 'string',
    required: true,
    description: 'The code of the football field',
    example: '793da735-c1f7-4942-822c-9f7a7a3a842b',
  })
  updateFootballField(
    @Param('code') code: FootballFieldCode,
    @Body() dto: UpdateFootballFieldDto,
  ) {
    return this.footballFieldsService.updateFootballField(code, dto);
  }
}
