import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { FootballField } from '../entities/football-field.entity';

export class UpdateFootballFieldDto extends PickType(FootballField, [
  'name',
  'picture',
]) {
  @ApiProperty({
    description: 'The name of the football field',
    example: 'Field 1',
    type: 'string',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The picture URL of the football field',
    example: 'https://example.com/field_1.jpg',
    type: 'string',
  })
  @IsUrl()
  picture?: string | null;
}
