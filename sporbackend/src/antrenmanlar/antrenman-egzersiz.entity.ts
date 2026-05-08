import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Antrenman } from './antrenman.entity';
import { Egzersiz } from '../egzersizler/egzersiz.entity';

@Entity()
export class AntrenmanEgzersiz {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Antrenman, a => a.egzersizler)
  antrenman: Antrenman;

  @ManyToOne(() => Egzersiz)
  egzersiz: Egzersiz;

  @Column()
  setSayisi: number;

  @Column()
  tekrarSayisi: number;

  @Column()
  sira: number;
}
