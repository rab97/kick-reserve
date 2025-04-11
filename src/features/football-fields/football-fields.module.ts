import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FootballField } from './entities/football-field.entity';
import { FootballFieldsController } from './football-fields.controller';
import { FootballFieldsService } from './football-fields.service';

@Module({
  imports: [TypeOrmModule.forFeature([FootballField])],
  controllers: [FootballFieldsController],
  providers: [FootballFieldsService],
  exports: [FootballFieldsService],
})
export class FootballFieldsModule {}
