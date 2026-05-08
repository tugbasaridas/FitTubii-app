import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Kullanici } from '../kullanicilar/kullanici.entity';
import { AntrenmanEgzersiz } from './antrenman-egzersiz.entity';

@Entity()
export class Antrenman {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:false})
  ad: string;

  @Column({ nullable: true })
  aciklama: string;

  // KOÇ
  @ManyToOne(() => Kullanici)
  koc: Kullanici;

  // USER
  @ManyToOne(() => Kullanici)
  kullanici: Kullanici;

  @OneToMany(() => AntrenmanEgzersiz, ae => ae.antrenman, {
    cascade: true,
  })
  egzersizler: AntrenmanEgzersiz[];

  @Column({ default: true })
  aktif: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
