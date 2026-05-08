import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Kullanici } from '../kullanicilar/kullanici.entity';
import { Rol } from '../kullanicilar/rol.enum';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Kullanici)
    private readonly kullaniciRepo: Repository<Kullanici>,
    private readonly jwtService: JwtService,
  ) {}

  // ✅ REGISTER
  async register(dto: RegisterDto) {
    const emailVarMi = await this.kullaniciRepo.findOne({
      where: { email: dto.email },
    });

    if (emailVarMi) {
      throw new BadRequestException('Bu email zaten kayıtlı');
    }

    const hashed = await bcrypt.hash(dto.sifre, 10);

    const yeni = this.kullaniciRepo.create({
      ad: dto.ad,
      email: dto.email,
      sifre: hashed,
      rol: dto.rol ?? Rol.USER, // rol gelmezse USER
    });

    return this.kullaniciRepo.save(yeni);
  }

  // ✅ LOGIN
  async login(dto: LoginDto) {
    const kullanici = await this.kullaniciRepo.findOne({
      where: { email: dto.email },
    });

    if (!kullanici) {
      throw new UnauthorizedException('Email hatalı');
    }

    const sifreDogru = await bcrypt.compare(dto.sifre, kullanici.sifre);
    if (!sifreDogru) {
      throw new UnauthorizedException('Şifre yanlış');
    }

    const token = this.jwtService.sign({
      id: kullanici.id,
      rol: kullanici.rol, 
    });

    return {
      message: 'Giriş başarılı',
      token,
    };
  }
}
