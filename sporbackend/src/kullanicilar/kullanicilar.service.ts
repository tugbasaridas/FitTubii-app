import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kullanici } from './kullanici.entity';
import { Rol } from './rol.enum';

@Injectable()
export class KullanicilarService {
  constructor(
    @InjectRepository(Kullanici)
    private readonly repo: Repository<Kullanici>,
  ) {}

  tumKullanicilar() {
    return this.repo.find({
      select: ['id', 'ad', 'email', 'rol'],
    });
  }

  kocIcinKullanicilar() {
    return this.repo.find({
      where: { rol: Rol.USER },
      select: ['id', 'ad', 'email'],
    });
  }
}
