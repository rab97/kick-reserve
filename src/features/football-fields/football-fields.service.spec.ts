import { Test, TestingModule } from '@nestjs/testing';
import { FootballFieldsService } from './football-fields.service';

describe('FootballFieldsService', () => {
  let service: FootballFieldsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FootballFieldsService],
    }).compile();

    service = module.get<FootballFieldsService>(FootballFieldsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
