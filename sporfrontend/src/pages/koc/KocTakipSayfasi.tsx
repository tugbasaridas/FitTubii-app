import { useEffect, useState } from "react";
import api from "../../api/api";

export default function KocTakipSayfasi() {
  const [takipVerisi, setTakipVerisi] = useState<any[]>([]);

  useEffect(() => {
    api.get("/antrenmanlar/koc/takip").then(res => setTakipVerisi(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-black mb-8 text-slate-800 flex items-center gap-3">
        📋 Danışan Geçmişi
      </h1>
      
      <div className="space-y-4">
        {takipVerisi.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-4xl shadow-sm border border-slate-100 flex justify-between items-center">
            
            <div className="flex flex-col gap-1">
              <p className="font-black text-indigo-600 text-xl uppercase tracking-tighter">
                {item.antrenman?.ad || "İsimsiz Antrenman"}
              </p>
              <p className="text-slate-400 font-bold text-sm uppercase">
                Danışan: {item.kullanici?.adSoyad || item.kullanici?.ad || "Bilinmeyen"}
              </p>
              
              {item.tamamlandiMi && item.tamamlanmaTarihi && (
                <div className="mt-2 flex items-center gap-2 text-slate-500 bg-slate-50 w-fit px-3 py-1 rounded-full border border-slate-100">
                  <span className="text-[11px] font-black uppercase italic">
                    {new Date(item.tamamlanmaTarihi).toLocaleString('tr-TR', {
                      day: '2-digit',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              )}
            </div>

            <div className={`px-5 py-2 rounded-2xl text-[10px] font-black tracking-widest shadow-sm ${
              item.tamamlandiMi 
                ? "bg-green-100 text-green-600 border border-green-200" 
                : "bg-amber-100 text-amber-600 border border-amber-200"
            }`}>
              {item.tamamlandiMi ? "TAMAMLANDI ✅" : "BEKLEMEDE ⏳"}
            </div>

          </div>
        ))}

        {takipVerisi.length === 0 && (
          <div className="text-center py-20 text-slate-400 font-bold italic">
            Henüz bir kayıt bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
}