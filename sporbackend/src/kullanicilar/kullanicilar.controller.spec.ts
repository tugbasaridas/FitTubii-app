import { Test, TestingModule } from '@nestjs/testing';
import { KullanicilarController } from './kullanicilar.controller';

describe('KullanicilarController', () => {
  let controller: KullanicilarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KullanicilarController],
    }).compile();

    controller = module.get<KullanicilarController>(KullanicilarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
