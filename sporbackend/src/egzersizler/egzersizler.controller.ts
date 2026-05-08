import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { EgzersizlerService } from './egzersizler.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../kullanicilar/rol.enum';
import { EgzersizKategori } from './egzersiz-kategori.enum';

@Controller('egzersizler')
export class EgzersizlerController {
  constructor(private readonly service: EgzersizlerService) {}

  // 🔓 herkes
  @Get()
  hepsi(@Query('kategori') kategori?: string) {
    return this.service.hepsi(kategori as EgzersizKategori);
  }

  // 🔓 enum kategori listesi
  @Get('kategoriler')
  kategoriler() {
    return Object.values(EgzersizKategori);
  }

  // 🔓 tek egzersiz
  @Get(':id')
  getir(@Param('id') id: number) {
    return this.service.getir(Number(id));
  }

  // 🔐 ADMIN → EKLE
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @UseInterceptors(
    FileInterceptor('resim', {
      storage: diskStorage({
        destination: 'uploads',
        filename: (req, file, cb) => {
          const uniqueName =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1e9) +
            extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
    }),
  )
  ekle(
    @Body() dto: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      dto.resimUrl = file.filename;
    }

    return this.service.ekle(dto);
  }

  // 🔐 ADMIN → GÜNCELLE
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @UseInterceptors(
    FileInterceptor('resim', {
      storage: diskStorage({
        destination: 'uploads',
        filename: (req, file, cb) => {
          const uniqueName =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1e9) +
            extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
    }),
  )
  guncelle(
    @Param('id') id: number,
    @Body() dto: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      dto.resimUrl = file.filename;
    } else {
      delete dto.resimUrl; // ⛔ eski resim silinmesin
    }

    return this.service.guncelle(Number(id), dto);
  }

  // 🔐 ADMIN → SOFT DELETE
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  sil(@Param('id') id: number) {
    return this.service.sil(Number(id));
  }
}
