import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import toast from "react-hot-toast";

export default function SerbestAntrenmanEkle() {
  const [ad, setAd] = useState("");
  const [set, setSet] = useState("");
  const [tekrar, setTekrar] = useState("");
  const [notlar, setNotlar] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleKaydet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ad.trim()) {
    toast.error("Lütfen aktivite adını girin!");
    return;
  }
    try {
      setLoading(true);

   
      await api.post("/antrenmanlar/serbest", { 
        serbestAd: ad, 
        serbestSet: set ? Number(set) : null, 
        serbestTekrar: tekrar ? Number(tekrar) : null,
        notlar: notlar || "" 
      });
      
      toast.success("Aktivite başarıyla kaydedildi! 💪");
      navigate("/kullanici"); 
    } catch (err) {
      console.error("Kaydetme hatası:", err);
      toast.error("Bir hata oluştu, lütfen tekrar dene.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">🏃‍♂️ Aktivite Kaydı</h1>
          <p className="text-slate-400 font-bold text-sm mt-2">Detayları ister gir, ister boş bırak!</p>
        </div>

        <form onSubmit={handleKaydet} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2 px-2">Aktivite İsmi *</label>
            <input
              required
              type="text"
              placeholder="Örn: Squat"
              className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none font-bold text-slate-700"
              value={ad}
              onChange={(e) => setAd(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-2">Set (Opsiyonel)</label>
              <input
                type="number"
                placeholder="0"
                className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none font-bold text-slate-700"
                value={set}
                onChange={(e) => setSet(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-2">Tekrar (Opsiyonel)</label>
              <input
                type="number"
                placeholder="0"
                className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none font-bold text-slate-700"
                value={tekrar}
                onChange={(e) => setTekrar(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-2">Yorumlar (Opsiyonel)</label>
            <textarea
              placeholder="Eklemek istediğin bir şey var mı?"
              className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none font-bold text-slate-700 min-h-25"
              value={notlar}
              onChange={(e) => setNotlar(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "KAYDEDİLİYOR..." : "KAYDI TAMAMLA ✅"}
          </button>
          
          <p className="text-[10px] text-center text-slate-300 font-bold uppercase">* İşaretli alanların doldurulması zorunludur.</p>
        </form>
      </div>
    </div>
  );
}