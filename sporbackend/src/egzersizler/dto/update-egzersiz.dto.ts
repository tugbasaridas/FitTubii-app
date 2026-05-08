import { EgzersizKategori } from '../egzersiz-kategori.enum';

export class UpdateEgzersizDto {
  ad?: string;
  aciklama?: string;
  resimUrl?: string;
  youtubeUrl?: string;
  kategori?: EgzersizKategori;
  aktif?: boolean;
}
