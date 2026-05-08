import { IsEmail, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Rol } from '../../kullanicilar/rol.enum';

export class RegisterDto {
  @IsNotEmpty()
  ad: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  sifre: string;

  @IsOptional()
  @IsEnum(Rol)
  rol?: Rol;
}
