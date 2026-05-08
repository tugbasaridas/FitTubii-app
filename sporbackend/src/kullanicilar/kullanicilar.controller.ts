import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { KullanicilarService } from './kullanicilar.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from './rol.enum';

@Controller('kullanicilar')
export class KullanicilarController {
  constructor(private readonly service: KullanicilarService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  tumKullanicilar() {
    return this.service.tumKullanicilar();
  }

  @Get('koc')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.KOC)
  kocIcinKullanicilar() {
    return this.service.kocIcinKullanicilar();
  }
}
