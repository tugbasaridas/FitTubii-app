import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EgzersizKategori } from './egzersiz-kategori.enum';

@Entity('egzersizler')
export class Egzersiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ad: string;

  @Column({ type: 'text' })
  aciklama: string;

  @Column({ nullable: true })
  resimUrl: string;

  @Column({ nullable: true })
  youtubeUrl?: string;

  @Column({ default: true })
   aktif: boolean;

  @Column({
    type: 'enum',
    enum: EgzersizKategori,
  })
  kategori: EgzersizKategori;
}
