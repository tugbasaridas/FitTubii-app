import { useEffect, useState } from "react";
import api from "../api/api";

const BASE_URL = "http://localhost:3000";

type Egzersiz = {
  id: number;
  ad: string;
  kategori: string;
  aciklama: string;
  resimUrl?: string;
  youtubeUrl?: string;
};

export default function MisafirEgzersiz() {
  const [egzersizler, setEgzersizler] = useState<Egzersiz[]>([]);
  const [aktifKategori, setAktifKategori] = useState<string>("Hepsi");

  useEffect(() => {
    api.get("/egzersizler").then((res) => {
      setEgzersizler(res.data);
    });
  }, []);

  const kategoriler = ["Hepsi", ...Array.from(new Set(egzersizler.map((e) => e.kategori)))];

  const filtrelenmisEgzersizler =
    aktifKategori === "Hepsi"
      ? egzersizler
      : egzersizler.filter((e) => e.kategori === aktifKategori);

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">Gelişmiş Egzersiz Rehberi</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl text-slate-900">
            Her seviyeye uygun hareketleri keşfet.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Spor rutininizi güçlendirecek egzersizleri inceleyin, kategoriye göre filtreleyin ve egzersiz videolarıyla öğrenin.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {kategoriler.map((k) => (
            <button
              key={k}
              onClick={() => setAktifKategori(k)}
              className={`px-5 py-3 rounded-full text-sm font-semibold transition ${
                aktifKategori === k
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-indigo-50"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filtrelenmisEgzersizler.map((e) => (
            <div
              key={e.id}
              className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-1"
            >
              <div className="relative h-56 w-full bg-slate-100">
                {e.resimUrl ? (
                  <img
                    src={`${BASE_URL}/uploads/${e.resimUrl}`}
                    alt={e.ad}
                    className="h-full w-full object-cover"
                    onError={(ev) => {
                      ev.currentTarget.src =
                        "https://via.placeholder.com/400x300?text=Resim+Bulunamadi";
                    }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-indigo-100 text-7xl font-black text-indigo-600">
                    {e.ad.charAt(0)}
                  </div>
                )}

                <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-700 shadow-sm">
                  {e.kategori}
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{e.ad}</h3>
                <p className="text-sm leading-7 text-slate-600 mb-6 whitespace-pre-line">
                  {e.aciklama}
                </p>
                {e.youtubeUrl ? (
                  <button
                    onClick={() => window.open(e.youtubeUrl, "_blank", "noopener,noreferrer")}
                    className="w-full rounded-full bg-indigo-600 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-indigo-500"
                  >
                    Videoya Git
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full rounded-full bg-slate-200 py-3 text-sm font-bold uppercase tracking-[0.12em] text-slate-400 cursor-not-allowed"
                  >
                    Video Yok
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
