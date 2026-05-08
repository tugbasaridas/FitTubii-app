import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

export default function KullaniciAnasayfa() {
  const [atamaListesi, setAtamaListesi] = useState<any[]>([]);
  const [serbestListe, setSerbestListe] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"koc" | "serbest">("koc");

  useEffect(() => {
    verileriGetir();
  }, []);

  const verileriGetir = async () => {
    try {
      setLoading(true);
      const resKoc = await api.get("/antrenmanlar/benim");
      setAtamaListesi(resKoc.data);

      try {
        const resSerbest = await api.get("/antrenmanlar/serbest");
        setSerbestListe(resSerbest.data);
      } catch (e) {
        console.warn("Serbest antrenman listesi boş veya hazır değil.");
      }
    } catch (err) {
      console.error("Veri çekilemedi:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center py-6">
        <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic">💪 Antrenman Takibi</h1>
      </div>

      <div className="flex bg-slate-200 p-1 rounded-2xl">
        <button
          onClick={() => setActiveTab("koc")}
          className={`flex-1 py-3 rounded-xl font-bold transition-all ${activeTab === "koc" ? "bg-white text-indigo-600 shadow-md" : "text-slate-500"}`}
        >
          Koç Programı
        </button>
        <button
          onClick={() => setActiveTab("serbest")}
          className={`flex-1 py-3 rounded-xl font-bold transition-all ${activeTab === "serbest" ? "bg-white text-indigo-600 shadow-md" : "text-slate-500"}`}
        >
          Serbest Spor
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 animate-pulse font-bold text-slate-400">Veriler Yükleniyor...</div>
      ) : (
        <div className="space-y-4">
          {activeTab === "koc" ? (
            atamaListesi.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-4xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-bold italic">Henüz atanmış bir programın yok.</p>
              </div>
            ) : (
              atamaListesi.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-4xl border border-slate-100 flex justify-between items-center shadow-sm hover:shadow-md transition-all">
                  <div>
                    <h3 className="font-black text-xl text-slate-800 uppercase tracking-tight">
                      {item.antrenman?.ad}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest ${item.tamamlandiMi ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"}`}>
                        {item.tamamlandiMi ? "TAMAMLANDI ✅" : "BEKLEMEDE ⏳"}
                      </span>
                      {item.tamamlanmaTarihi && (
                        <p className="text-[10px] text-slate-400 font-bold italic">
                          {new Date(item.tamamlanmaTarihi).toLocaleDateString('tr-TR')}
                        </p>
                      )}
                    </div>
                  </div>
                  <Link
                    to={`/antrenman-yap/${item.id}`}
                    className="bg-indigo-600 text-white px-6 py-2.5 rounded-2xl font-black text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
                  >
                    Detay
                  </Link>
                </div>
              ))
            )
          ) : (
            <div className="space-y-4">
              <Link 
                to="/serbest-ekle" 
                className="block w-full text-center border-2 border-dashed border-indigo-300 p-6 rounded-4xl text-indigo-600 font-black hover:bg-indigo-50 transition-all bg-white"
              >
                + Bugün Ne Yaptın? (Aktivite Ekle)
              </Link>
              
              {serbestListe.map((s) => (
                <div key={s.id} className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="font-black text-slate-800 text-lg uppercase tracking-tight">{s.serbestAd}</p>
                    
                    {(s.serbestSet || s.serbestTekrar) && (
                      <div className="flex gap-2 mb-1">
                        {s.serbestSet && (
                          <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-2 py-0.5 rounded-md border border-indigo-100 uppercase">
                            {s.serbestSet} SET
                          </span>
                        )}
                        {s.serbestTekrar && (
                          <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2 py-0.5 rounded-md border border-emerald-100 uppercase">
                            {s.serbestTekrar} TEKRAR
                          </span>
                        )}
                      </div>
                    )}

                    <p className="text-slate-400 font-bold text-xs italic">{s.notlar || "Not yok"}</p>
                    
                    <p className="text-[10px] text-indigo-500 font-black mt-2 uppercase tracking-tighter">
                      {(s.tamamlanmaTarihi || s.tarih) 
                        ? new Date(s.tamamlanmaTarihi || s.tarih).toLocaleDateString('tr-TR') 
                        : "Tarih Belirsiz"}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center text-2xl shadow-inner border border-slate-100">
                    {s.serbestSet ? "💪" : "🏃‍♂️"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}