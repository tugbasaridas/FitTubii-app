import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Egzersiz } from './egzersiz.entity';
import { EgzersizKategori } from './egzersiz-kategori.enum';
import { UpdateEgzersizDto } from './dto/update-egzersiz.dto';

@Injectable()
export class EgzersizlerService {
  constructor(
    @InjectRepository(Egzersiz)
    private readonly repo: Repository<Egzersiz>,
  ) {}

  // 🔓 sadece aktif egzersizler
  hepsi(kategori?: EgzersizKategori) {
    if (kategori) {
      return this.repo.find({
        where: { kategori, aktif: true },
      });
    }

    return this.repo.find({
      where: { aktif: true },
    });
  }

  // 🔓 tek egzersiz
  async getir(id: number) {
    const egzersiz = await this.repo.findOne({
      where: { id, aktif: true },
    });

    if (!egzersiz) {
      throw new NotFoundException('Egzersiz bulunamadı');
    }

    return egzersiz;
  }

  // 🔐 ADMIN
  ekle(dto: any) {
    const egzersiz = this.repo.create({
      ad: dto.ad,
      aciklama: dto.aciklama,
      resimUrl: dto.resimUrl,
      youtubeUrl:dto.youtubeUrl,
      kategori: dto.kategori,
      aktif: true,
    });

    return this.repo.save(egzersiz);
  }

  // 🔐 ADMIN (DTO’ya göre)
  async guncelle(id: number, dto: UpdateEgzersizDto) {
    const egzersiz = await this.repo.findOne({ where: { id } });
    if (!egzersiz) {
      throw new NotFoundException('Egzersiz bulunamadı');
    }

    Object.assign(egzersiz, dto);

    return this.repo.save(egzersiz);
  }

  // 🔐 ADMIN (soft delete)
  async sil(id: number) {
    const egzersiz = await this.repo.findOne({ where: { id } });
    if (!egzersiz) {
      throw new NotFoundException('Egzersiz bulunamadı');
    }

    egzersiz.aktif = false;
    await this.repo.save(egzersiz);

    return { mesaj: 'Egzersiz pasif hale getirildi' };
  }
}
