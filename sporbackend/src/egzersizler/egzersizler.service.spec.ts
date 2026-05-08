import { Test, TestingModule } from '@nestjs/testing';
import { EgzersizlerService } from './egzersizler.service';

describe('EgzersizlerService', () => {
  let service: EgzersizlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EgzersizlerService],
    }).compile();

    service = module.get<EgzersizlerService>(EgzersizlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
