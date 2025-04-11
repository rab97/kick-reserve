import { Test, TestingModule } from '@nestjs/testing';
import { FootballFieldsController } from './football-fields.controller';
import { FootballFieldsService } from './football-fields.service';

describe('FootballFieldsController', () => {
  let controller: FootballFieldsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FootballFieldsController],
      providers: [FootballFieldsService],
    }).compile();

    controller = module.get<FootballFieldsController>(FootballFieldsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
