import { Test, TestingModule } from '@nestjs/testing';
import { EgzersizlerController } from './egzersizler.controller';

describe('EgzersizlerController', () => {
  let controller: EgzersizlerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EgzersizlerController],
    }).compile();

    controller = module.get<EgzersizlerController>(EgzersizlerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
