import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Egzersiz } from './egzersiz.entity';
import { EgzersizlerService } from './egzersizler.service';
import { EgzersizlerController } from './egzersizler.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Egzersiz])],
  providers: [EgzersizlerService],
  controllers: [EgzersizlerController],
})
export class EgzersizlerModule {}
