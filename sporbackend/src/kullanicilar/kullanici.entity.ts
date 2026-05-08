import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Rol } from './rol.enum';

@Entity('kullanicilar')
export class Kullanici {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ad: string;

  @Column({ unique: true })
  email: string;

  @Column()
  sifre: string;

  @Column({
    type: 'enum',
    enum: Rol,
    default: Rol.USER,
  })
  rol: Rol;
}
