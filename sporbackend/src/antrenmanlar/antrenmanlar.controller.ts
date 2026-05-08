import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { AntrenmanlarService } from './antrenmanlar.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../kullanicilar/rol.enum';
import { CreateAntrenmanDto } from './dto/create-antrenman.dto';

@Controller('antrenmanlar')
export class AntrenmanlarController {
  constructor(private service: AntrenmanlarService) {}

  // 🧑‍🏫 KOÇ
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.KOC)
  olustur(@Req() req, @Body() dto: any) {
    return this.service.olustur(req.user.id, dto);
  }

  // 👤 USER
  @Get('benim')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.USER)
  benim(@Req() req) {
    return this.service.benimAntrenmanlarim(req.user.id);
  }

  // 👤 USER → tamamla
  @Post('tamamla/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.USER)
  tamamla(@Req() req, @Param('id') id: number) {
    return this.service.tamamla(Number(id));
  }

  // 👤 USER → Serbest Antrenman Ekleme
  @Post('serbest')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.USER)
  async serbestEkle(
    @Req() req, 
    @Body() body: { 
      serbestAd: string; 
      serbestSet?: number;    
      serbestTekrar?: number; 
      notlar?: string 
    }
  ) {
    
    return this.service.serbestEkle(
      req.user.id, 
      body.serbestAd, 
      body.serbestSet, 
      body.serbestTekrar,
      body.notlar
    );
  }

  // 👤 USER → Serbest Antrenmanları Listeleme
  @Get('serbest')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.USER)
  async serbestListe(@Req() req) {
    return this.service.serbestListe(req.user.id);
  }

  // 🧑‍🏫 KOÇ → takip
  @Get('koc/takip')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.KOC)
  takip(@Req() req) {
    return this.service.kocTakip(req.user.id);
  }
}