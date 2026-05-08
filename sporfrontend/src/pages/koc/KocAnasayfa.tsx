import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

type Kullanici = {
  id: number;
  ad: string;
  email: string;
};

export default function KocAnasayfa() {
  const [kullanicilar, setKullanicilar] = useState<Kullanici[]>([]);
  const [takipVerisi, setTakipVerisi] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verileriGetir = async () => {
      try {
        setLoading(true);
        const kullaniciRes = await api.get("/kullanicilar/koc");
        setKullanicilar(kullaniciRes.data);
        const takipRes = await api.get("/antrenmanlar/koc/takip");
        setTakipVerisi(takipRes.data);
      } catch (err) {
        console.error("Veri çekme hatası:", err);
      } finally {
        setLoading(false);
      }
    };

    verileriGetir();
  }, []);

  const toplamAtanan = takipVerisi.length;

  const bugun = new Date().toLocaleDateString('tr-TR'); 
  
  const bugunTamamlanan = takipVerisi.filter((t) => {
    
    if (!t.tamamlandiMi || !t.tamamlanmaTarihi) return false;
    
    const antrenmanTarihi = new Date(t.tamamlanmaTarihi).toLocaleDateString('tr-TR');
    return antrenmanTarihi === bugun;
  }).length;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* BAŞLIK */}
      <div>
        <h1 className="text-4xl font-black text-slate-800">Koç Paneli</h1>
        <p className="text-slate-500 font-medium">
          Kullanıcıların antrenmanlarının yönetim merkezi
        </p>
      </div>

      {/* ÖZET KUTUCUKLARI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Toplam Kullanıcı</p>
          <p className="text-4xl font-black text-indigo-600">{kullanicilar.length}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Atanan Antrenman</p>
          <p className="text-4xl font-black text-slate-800">{toplamAtanan}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Bugün Yapılan</p>
          <p className="text-4xl font-black text-green-600">{bugunTamamlanan}</p>
        </div>
      </div>

      {/* AKSİYONLAR */}
      <div className="flex gap-4">
        <Link
          to="/koc/antrenman-olustur"
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
        >
          ➕ Antrenman Ata
        </Link>

        <Link
          to="/koc/antrenmanlar"
          className="bg-slate-800 text-white px-8 py-4 rounded-2xl font-black hover:bg-slate-900 transition shadow-lg shadow-slate-200"
        >
          📋 Antrenmanları Gör
        </Link>
      </div>

      {/* KULLANICI LİSTESİ */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 space-y-6">
        <h2 className="text-2xl font-black text-slate-800">Danışanlar</h2>

        {loading ? (
          <p className="text-slate-400 italic">Veriler yükleniyor…</p>
        ) : kullanicilar.length === 0 ? (
          <p className="text-slate-400">Henüz danışanınız bulunmuyor.</p>
        ) : (
          <div className="grid gap-4">
            {kullanicilar.map((k) => (
              <div
                key={k.id}
                className="flex justify-between items-center border border-slate-50 p-5 rounded-2xl hover:bg-slate-50 transition group"
              >
                <div>
                  <p className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition">
                    {k.ad}
                  </p>
                  <p className="text-sm text-slate-400 font-medium">{k.email}</p>
                </div>

                <Link
                  to={`/koc/kullanici/${k.id}`}
                  className="bg-indigo-50 text-indigo-600 px-5 py-2 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition"
                >
                  Detay →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}