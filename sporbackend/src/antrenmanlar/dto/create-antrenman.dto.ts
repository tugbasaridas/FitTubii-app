export class CreateAntrenmanDto {
  ad: string;
  aciklama?: string;
  kullaniciId: number;
  egzersizler: {
    egzersizId: number;
    setSayisi: number;
    tekrarSayisi: number;
    sira: number;
  }[];
}
