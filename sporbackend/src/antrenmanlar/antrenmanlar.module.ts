// antrenmanlar/antrenmanlar.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AntrenmanlarController } from './antrenmanlar.controller';
import { AntrenmanlarService } from './antrenmanlar.service';
import { Antrenman } from './antrenman.entity';
import { AntrenmanEgzersiz } from './antrenman-egzersiz.entity';
import { KullaniciAntrenman } from './kullanici-antrenman.entity';
import { Kullanici } from '../kullanicilar/kullanici.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Antrenman, AntrenmanEgzersiz, KullaniciAntrenman, Kullanici])],
  controllers: [AntrenmanlarController],
  providers: [AntrenmanlarService],
})
export class AntrenmanlarModule {}
