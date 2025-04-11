import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { Team } from '../entities/team.entity';

export class CreateTeamDto extends PickType(Team, ['name', 'picture']) {
  @ApiProperty({
    description: 'The name of the team',
    example: 'Team A',
    type: 'string',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The picture URL of the team',
    example: 'https://example.com/team_a.jpg',
    type: 'string',
  })
  @IsUrl()
  picture?: string | null;
}
