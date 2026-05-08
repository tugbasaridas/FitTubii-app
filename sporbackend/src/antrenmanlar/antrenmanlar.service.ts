import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Not } from 'typeorm'; // 👈 Not eklendi
import { Antrenman } from './antrenman.entity';
import { AntrenmanEgzersiz } from './antrenman-egzersiz.entity';
import { KullaniciAntrenman } from './kullanici-antrenman.entity';
import { Kullanici } from '../kullanicilar/kullanici.entity';
import { CreateAntrenmanDto } from './dto/create-antrenman.dto';

@Injectable()
export class AntrenmanlarService {
  constructor(
    @InjectRepository(Antrenman)
    private antrenmanRepo: Repository<Antrenman>,

    @InjectRepository(AntrenmanEgzersiz)
    private aeRepo: Repository<AntrenmanEgzersiz>,

    @InjectRepository(KullaniciAntrenman)
    private kaRepo: Repository<KullaniciAntrenman>,

    @InjectRepository(Kullanici)
    private kullaniciRepo: Repository<Kullanici>,
  ) {}

  // 🧑‍🏫 KOÇ → kullanıcıya antrenman atar
  async olustur(kocId: number, dto: CreateAntrenmanDto) {
    const kullanici = await this.kullaniciRepo.findOne({
      where: { id: dto.kullaniciId },
    });

    if (!kullanici) throw new NotFoundException('Kullanıcı yok');

    const antrenman = this.antrenmanRepo.create({
      ad: dto.ad,
      aciklama: dto.aciklama,
      koc: { id: kocId } as any,
      kullanici,
      egzersizler: dto.egzersizler.map(e => ({
        egzersiz: { id: e.egzersizId } as any,
        setSayisi: e.setSayisi,
        tekrarSayisi: e.tekrarSayisi,
        sira: e.sira,
      })),
    });

    const saved = await this.antrenmanRepo.save(antrenman);

    await this.kaRepo.save({
      antrenman: saved,
      kullanici,
    });

    return saved;
  }

  // 👤 USER → kendi antrenmanları (KOÇUN ATADIKLARI)
  async benimAntrenmanlarim(userId: number) {
    return this.kaRepo.find({
      where: { 
        kullanici: { id: userId },
        antrenman: Not(IsNull()) 
      },
      relations: [
        'antrenman', 
        'antrenman.egzersizler', 
        'antrenman.egzersizler.egzersiz'
      ],
      order: { id: 'DESC' }
    });
  }

  // 👤 USER → tamamla
  async tamamla(atamaId: number) {
    const kayit = await this.kaRepo.findOne({
      where: { id: atamaId },
    });

    if (!kayit) throw new ForbiddenException('Antrenman kaydı bulunamadı.');

    kayit.tamamlandiMi = true;
    kayit.tamamlanmaTarihi = new Date();

    return this.kaRepo.save(kayit);
  }

  // 👤 USER → Serbest antrenman ekle
  async serbestEkle(userId: number, ad: string, set?: number, tekrar?: number, notlar?: string) {
    const yeni = this.kaRepo.create({
      kullanici: { id: userId },
      serbestAd: ad,
      serbestSet: set,      
      serbestTekrar: tekrar, 
      notlar: notlar,
      tamamlandiMi: true,
      tamamlanmaTarihi: new Date(),
    });
    return this.kaRepo.save(yeni);
  }

  // 👤 USER → Serbest antrenmanları listele
  async serbestListe(userId: number) {
    return this.kaRepo.find({
      where: { 
        kullanici: { id: userId },
        antrenman: IsNull() 
      },
      order: { id: 'DESC' }
    });
  }

  // 🧑‍🏫 KOÇ → takip
  kocTakip(kocId: number) {
    return this.kaRepo.find({
      relations: ['kullanici', 'antrenman'],
      where: {
        antrenman: {
          koc: { id: kocId },
        },
      },
    });
  }
}