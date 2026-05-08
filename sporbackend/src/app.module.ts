import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KullanicilarModule } from './kullanicilar/kullanicilar.module';
import { AuthModule } from './auth/auth.module';
import { EgzersizlerModule } from './egzersizler/egzersizler.module';
import { AntrenmanlarModule } from './antrenmanlar/antrenmanlar.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'spor_dbb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    KullanicilarModule,
    AuthModule,
    EgzersizlerModule,
    AntrenmanlarModule
  ],
})
export class AppModule {}
