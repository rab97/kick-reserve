import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateFootballFieldDto } from './dto/create-football-field.dto';
import { UpdateFootballFieldDto } from './dto/update-football-field.dto';
import {
  FootballField,
  FootballFieldCode,
} from './entities/football-field.entity';

@Injectable()
export class FootballFieldsService {
  constructor(
    @InjectRepository(FootballField)
    private readonly footballFieldsRepository: MongoRepository<FootballField>,
  ) {}

  /**
   * Gets all football-fields
   * @returns all football-field objects
   */
  getFootballFields() {
    return this.footballFieldsRepository.find();
  }

  /**
   * Gets the football field by its code
   * @param code the football-field code
   * @returns football field object by its code
   */
  getFootballField(code: FootballFieldCode) {
    return this.footballFieldsRepository.findOneBy({
      code,
    });
  }

  /**
   * Creates a new football-field
   * @param dto football-field object
   */
  async createFootballField(dto: CreateFootballFieldDto) {
    const newFootballField = new FootballField(dto);
    await this.footballFieldsRepository.save(newFootballField);
  }

  async updateFootballField(
    footballFieldCode: FootballFieldCode,
    dto: UpdateFootballFieldDto,
  ) {
    await this.footballFieldsRepository.update(
      { code: footballFieldCode },
      dto,
    );
  }
}
