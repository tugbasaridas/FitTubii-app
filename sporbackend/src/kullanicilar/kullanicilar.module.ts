import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kullanici } from './kullanici.entity';
import { KullanicilarController } from './kullanicilar.controller';
import { KullanicilarService } from './kullanicilar.service';

@Module({
  imports: [TypeOrmModule.forFeature([Kullanici])],
  controllers: [KullanicilarController],
  providers: [KullanicilarService],
  exports: [KullanicilarService],
})
export class KullanicilarModule {}
