import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team, TeamCode } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamsRepository: MongoRepository<Team>,
  ) {}

  /**
   * Returns the list of all teams
   * @returns all teams objects
   */
  getTeams() {
    return this.teamsRepository.find();
  }

  /**
   * Returns a team given its code
   * @param teamCode team code identifier
   * @returns team object
   */
  getTeam(teamCode: TeamCode) {
    return this.teamsRepository.findOneBy({
      code: teamCode,
    });
  }

  /**
   * Creates a new team
   * @param dto team object
   */
  async createTeam(dto: CreateTeamDto) {
    const newTeam = new Team(dto);
    await this.teamsRepository.save(newTeam);
  }

  /**
   * Update a team given its code
   * @param teamCode team code identifier
   * @param dto team object
   */
  async updateTeam(teamCode: TeamCode, dto: UpdateTeamDto) {
    await this.teamsRepository.update({ code: teamCode }, dto);
  }
}
