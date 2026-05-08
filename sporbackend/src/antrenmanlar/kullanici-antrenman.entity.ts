import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Kullanici } from '../kullanicilar/kullanici.entity';
import { Antrenman } from './antrenman.entity';

@Entity()
export class KullaniciAntrenman {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Kullanici)
  kullanici: Kullanici;

  // Antrenman nullable: true olmalı çünkü serbest sporda koç antrenmanı olmayacak
  @ManyToOne(() => Antrenman, { nullable: true })
  antrenman: Antrenman;

  @Column({ default: false })
  tamamlandiMi: boolean;

  @Column({ type: 'timestamp', nullable: true })
  tamamlanmaTarihi: Date;

  // --- SERBEST SPOR ALANLARI ---

  @Column({ nullable: true })
  serbestAd: string; // Kullanıcının kendi girdiği spor ismi (Örn: "Sahil Yürüyüşü")

  @Column({ type: 'text', nullable: true })
  notlar: string; // Aktiviteyle ilgili kısa notlar

  @Column({ nullable: true })
  serbestSet: number;

  @Column({ nullable: true })
  serbestTekrar: number;
}