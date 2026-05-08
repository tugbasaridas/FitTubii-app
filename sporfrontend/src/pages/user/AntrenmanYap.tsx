import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import toast from "react-hot-toast";

export default function AntrenmanYap() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [atama, setAtama] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const detayGetir = async () => {
      try {
        setLoading(true);
        const res = await api.get("/antrenmanlar/benim");
        
        const bulundu = res.data.find((item: any) => item.id === Number(id));
        setAtama(bulundu);
      } catch (err) {
        console.error("Detaylar yüklenemedi:", err);
      } finally {
        setLoading(false);
      }
    };
    detayGetir();
  }, [id]);

  const antrenmaniTamamla = async () => {
    try {
      await api.post(`/antrenmanlar/tamamla/${id}`);
      toast.success("Tebrikler! Antrenman başarıyla tamamlandı. 🎉");
      navigate("/kullanici");
    } catch (err) {
      console.error("Hata:", err);
      toast.error("Onaylanırken bir sorun oluştu.");
    }
  };

  if (loading) return <div className="p-10 text-center font-bold italic">Antrenman detayları yükleniyor...</div>;
  if (!atama) return <div className="p-10 text-center text-red-500">Antrenman bulunamadı!</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* BAŞLIK VE KOÇ NOTU */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-3xl font-black text-indigo-600 uppercase">
          {atama.antrenman?.ad}
        </h1>
        {atama.antrenman?.aciklama && (
          <div className="mt-4 p-4 bg-indigo-50 rounded-2xl border-l-4 border-indigo-500">
            <p className="text-sm font-bold text-indigo-700 uppercase mb-1">Koçun Notu:</p>
            <p className="text-slate-600 italic">{atama.antrenman.aciklama}</p>
          </div>
        )}
      </div>

      {/* EGZERSİZ LİSTESİ */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-2 px-2">
          💪 Hareketler
        </h2>
        {atama.antrenman?.egzersizler?.map((e: any) => (
          <div key={e.id} className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl">
                🏋️
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">{e.egzersiz?.ad}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hedef Bölge</p>
              </div>
            </div>
            
            <div className="flex gap-8">
              <div className="text-center">
                <p className="text-2xl font-black text-indigo-600">{e.setSayisi}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Set</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-indigo-600">{e.tekrarSayisi}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Tekrar</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AKSİYON BUTONLARI */}
      <div className="space-y-3 pt-4">
        {!atama.tamamlandiMi ? (
          <button
            onClick={antrenmaniTamamla}
            className="w-full bg-green-500 text-white py-6 rounded-3xl font-black text-xl shadow-xl shadow-green-100 hover:bg-green-600 hover:-translate-y-1 transition-all active:scale-95"
          >
            ANTRENMANI BİTİRDİM ✅
          </button>
        ) : (
          <div className="w-full bg-slate-100 text-slate-400 py-6 rounded-3xl font-black text-xl text-center">
            BU ANTRENMANI TAMAMLADIN ✨
          </div>
        )}
        
        <button 
          onClick={() => navigate("/kullanici")}
          className="w-full text-slate-400 font-bold text-sm hover:text-slate-600 transition"
        >
          Geri Dön
        </button>
      </div>
    </div>
  );
}