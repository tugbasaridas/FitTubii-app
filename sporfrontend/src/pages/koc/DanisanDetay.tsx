import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function DanisanDetay() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [antrenmanlar, setAntrenmanlar] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get("/antrenmanlar/koc/takip")
      .then((res) => {
        const filtreli = res.data.filter((item: any) => {
          const veriId = item.kullaniciId || (item.kullanici && item.kullanici.id);
          return Number(veriId) === Number(id);
        });
        setAntrenmanlar(filtreli);
      })
      .catch((err) => console.error("Veri çekme hatası:", err))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* ÜST BAŞLIK VE GERİ BUTONU */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">
            Danışan Geçmişi
          </h1>
          {antrenmanlar.length > 0 && (
            <p className="text-indigo-500 font-bold text-sm">
              {antrenmanlar[0].kullanici?.adSoyad || antrenmanlar[0].kullanici?.ad} kişisinin kayıtları
            </p>
          )}
        </div>
        <button 
          onClick={() => navigate(-1)} 
          className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-slate-200 transition"
        >
          ← Geri Dön
        </button>
      </div>
      
      {loading ? (
        <div className="py-20 text-center font-bold text-slate-400 animate-pulse">Veriler çekiliyor...</div>
      ) : antrenmanlar.length === 0 ? (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-12 rounded-4xl text-slate-400 font-bold text-center">
          🔍 Bu danışana ait henüz bir antrenman kaydı bulunamadı.
        </div>
      ) : (
        <div className="space-y-4">
          {antrenmanlar.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-4xl shadow-sm border border-slate-100 flex justify-between items-center hover:shadow-md transition-all">
              <div className="space-y-2">
                <p className="font-black text-indigo-600 text-xl uppercase tracking-tight">
                  {item.antrenman?.ad || "Genel Antrenman"}
                </p>
                
                {/* TARİH EKLEMESİ: İşte burada tarih devreye giriyor */}
                {item.tamamlandiMi && item.tamamlanmaTarihi ? (
                  <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-3 py-1 rounded-full w-fit border border-slate-100">
                    <span className="text-[10px] font-black uppercase italic">
                      {new Date(item.tamamlanmaTarihi).toLocaleString('tr-TR', {
                        day: '2-digit',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest px-3">Henüz Tamamlanmadı</p>
                )}
              </div>

              <div className={`px-5 py-2 rounded-2xl text-[10px] font-black tracking-widest ${
                item.tamamlandiMi ? "bg-green-100 text-green-600 border border-green-200" : "bg-amber-100 text-amber-600 border border-amber-200"
              }`}>
                {item.tamamlandiMi ? "TAMAMLANDI ✅" : "BEKLEMEDE ⏳"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}