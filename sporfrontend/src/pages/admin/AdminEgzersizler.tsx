import { useEffect, useState } from "react";
import api from "../../api/api";

const KATEGORILER = [
  "BACAK",
  "GOGUS",
  "SIRT",
  "OMUZ",
  "KOL",
  "KARIN",
  "KARDIYO",
  "KALCA"
];

export default function AdminEgzersizler() {
  const [egzersizler, setEgzersizler] = useState<any[]>([]);

  const [seciliId, setSeciliId] = useState<number | null>(null);
  const [ad, setAd] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [kategori, setKategori] = useState("BACAK");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [resim, setResim] = useState<File | null>(null);

  /* ================= GETİR ================= */
  const getir = async () => {
    const res = await api.get("/egzersizler");
    setEgzersizler(res.data);
  };

  useEffect(() => {
    getir();
  }, []);

  /* ================= FORM RESET ================= */
  const temizle = () => {
    setSeciliId(null);
    setAd("");
    setAciklama("");
    setKategori("BACAK");
    setYoutubeUrl("");
    setResim(null);
  };

  /* ================= EKLE ================= */
  const ekle = async () => {
    const fd = new FormData();
    fd.append("ad", ad);
    fd.append("aciklama", aciklama);
    fd.append("kategori", kategori);
    fd.append("youtubeUrl", youtubeUrl);
    if (resim) fd.append("resim", resim);

    await api.post("/egzersizler", fd);
    getir();
    temizle();
  };

  /* ================= GÜNCELLE ================= */
  const guncelle = async () => {
    if (!seciliId) return;

    const fd = new FormData();
    fd.append("ad", ad);
    fd.append("aciklama", aciklama);
    fd.append("kategori", kategori);
    fd.append("youtubeUrl", youtubeUrl);
    if (resim) fd.append("resim", resim);

    await api.put(`/egzersizler/${seciliId}`, fd);
    getir();
    temizle();
  };

  /* ================= SİL ================= */
  const sil = async (id: number) => {
    await api.delete(`/egzersizler/${id}`);
    getir();
  };

  /* ================= DÜZENLE ================= */
  const duzenle = (e: any) => {
    setSeciliId(e.id);
    setAd(e.ad);
    setAciklama(e.aciklama);
    setKategori(e.kategori);
    setYoutubeUrl(e.youtubeUrl || "");
    setResim(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-black">Admin · Egzersiz Yönetimi</h1>

      {/* ================= FORM ================= */}
      <div className="bg-white p-6 rounded shadow space-y-3">
        <input
          placeholder="Egzersiz adı"
          value={ad}
          onChange={(e) => setAd(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Açıklama"
          value={aciklama}
          onChange={(e) => setAciklama(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="w-full border p-2 rounded"
        >
          {KATEGORILER.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>

        <input
          placeholder="YouTube URL"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {/* ===== RESİM SEÇ BUTON ===== */}
        <div className="space-y-2">
          <input
            id="resimInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setResim(e.target.files?.[0] || null)}
          />

          <label
            htmlFor="resimInput"
            className="inline-block bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded cursor-pointer font-semibold"
          >
            📸 Resim Seç
          </label>

          {resim && (
            <div className="text-sm text-green-700">
              Seçilen dosya: <b>{resim.name}</b>
            </div>
          )}
        </div>

        {/* ===== BUTONLAR ===== */}
        <div className="flex gap-3">
          {seciliId ? (
            <>
              <button
                onClick={guncelle}
                className="bg-green-600 text-white px-6 py-2 rounded"
              >
                Güncelle
              </button>
              <button
                onClick={temizle}
                className="bg-gray-400 text-white px-6 py-2 rounded"
              >
                İptal
              </button>
            </>
          ) : (
            <button
              onClick={ekle}
              className="bg-indigo-600 text-white px-6 py-2 rounded"
            >
              Egzersiz Ekle
            </button>
          )}
        </div>
      </div>

      {/* ================= LİSTE ================= */}
      <div className="space-y-4">
        {egzersizler.map((e) => (
          <div
            key={e.id}
            className="flex justify-between items-center bg-white p-4 rounded shadow"
          >
            <div>
              <b>{e.ad}</b> · {e.kategori}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => duzenle(e)}
                className="text-blue-600 font-semibold"
              >
                Düzenle
              </button>
              <button
                onClick={() => sil(e.id)}
                className="text-red-600 font-semibold"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
