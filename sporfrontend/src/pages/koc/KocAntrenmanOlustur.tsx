import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import toast from "react-hot-toast";

type Egzersiz = {
  id: number;
  ad: string;
};

export default function KocAntrenmanOlustur() {
  const { kullaniciId } = useParams();
  const navigate = useNavigate();

  const [egzersizler, setEgzersizler] = useState<Egzersiz[]>([]);
  const [secilen, setSecilen] = useState<
    { egzersizId: number; setSayisi: number; tekrarSayisi: number }[]
  >([]);
  const [ad, setAd] = useState("");
  const [aciklama, setAciklama] = useState("");

  useEffect(() => {
    api.get("/egzersizler").then((res) => setEgzersizler(res.data));
  }, []);

  const sec = (e: Egzersiz) => {
    if (secilen.find((s) => s.egzersizId === e.id)) return;
    setSecilen([...secilen, { egzersizId: Number(e.id), setSayisi: 3, tekrarSayisi: 10 }]);
  };

  const arttirSet = (id: number) => {
    setSecilen(secilen.map(s => s.egzersizId === id ? {...s, setSayisi: s.setSayisi + 1} : s));
  };

  const azaltSet = (id: number) => {
    setSecilen(secilen.map(s => s.egzersizId === id ? {...s, setSayisi: Math.max(1, s.setSayisi - 1)} : s));
  };

  const arttirTekrar = (id: number) => {
    setSecilen(secilen.map(s => s.egzersizId === id ? {...s, tekrarSayisi: s.tekrarSayisi + 1} : s));
  };

  const azaltTekrar = (id: number) => {
    setSecilen(secilen.map(s => s.egzersizId === id ? {...s, tekrarSayisi: Math.max(1, s.tekrarSayisi - 1)} : s));
  };

  const kaydet = async () => {
    if (!ad.trim()) return toast.error("Antrenman adı boş olamaz");
    if (!secilen.length) return toast.error("En az 1 egzersiz seçilmeli");
    if (!kullaniciId) return toast.error("Kullanıcı seçili değil");

    try {
      const payload = {
        kullaniciId: Number(kullaniciId),
        ad: ad.trim(),
        aciklama: aciklama.trim() || "Açıklama girilmedi",
        egzersizler: secilen.map((s, index) => ({
          egzersizId: Number(s.egzersizId),
          setSayisi: Number(s.setSayisi),
          tekrarSayisi: Number(s.tekrarSayisi),
          sira: index + 1,
        })),
      };

      await api.post("/antrenmanlar", payload);
      
      toast.success("Antrenman başarıyla oluşturuldu! 🎉");
      navigate("/koc"); 
    } catch (error: any) {
      const errorData = error.response?.data;
      const detailedMessage = Array.isArray(errorData?.message) 
        ? errorData.message.join("\n") 
        : errorData?.message || "Sunucuyla iletişim kurulamadı.";
        
      toast.error("Hata:\n" + detailedMessage);
      console.error("Hata Detayı:", errorData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-black text-slate-800">Antrenman Oluştur</h1>

      <div className="space-y-3">
        <input
          placeholder="Antrenman adı (Örn: Göğüs Günü)"
          value={ad}
          onChange={(e) => setAd(e.target.value)}
          className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <textarea
          placeholder="Antrenman açıklaması veya notlar"
          value={aciklama}
          onChange={(e) => setAciklama(e.target.value)}
          className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none h-24"
        />
      </div>

      <h2 className="text-xl font-bold text-slate-700">Egzersiz Seç</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {egzersizler.map((e) => (
          <div
            key={e.id}
            className="p-3 border border-slate-100 rounded-xl cursor-pointer hover:bg-indigo-50 hover:border-indigo-200 transition shadow-sm font-medium text-center"
            onClick={() => sec(e)}
          >
            {e.ad}
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-slate-700">Seçilen Egzersizler</h2>
      <div className="space-y-3">
        {secilen.length === 0 && <p className="text-slate-400 italic">Henüz egzersiz seçilmedi.</p>}
        {secilen.map((s) => {
          const e = egzersizler.find((ex) => ex.id === s.egzersizId);
          return (
            <div key={s.egzersizId} className="flex flex-wrap items-center gap-4 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
              <div className="flex-1 font-bold text-slate-800">{e?.ad}</div>
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-lg">
                <span className="text-xs text-slate-500 font-bold uppercase">Set:</span>
                <button onClick={() => azaltSet(s.egzersizId)} className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-full hover:bg-red-50 text-red-500">-</button>
                <span className="font-bold w-4 text-center">{s.setSayisi}</span>
                <button onClick={() => arttirSet(s.egzersizId)} className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-full hover:bg-green-50 text-green-500">+</button>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-lg">
                <span className="text-xs text-slate-500 font-bold uppercase">Tekrar:</span>
                <button onClick={() => azaltTekrar(s.egzersizId)} className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-full hover:bg-red-50 text-red-500">-</button>
                <span className="font-bold w-4 text-center">{s.tekrarSayisi}</span>
                <button onClick={() => arttirTekrar(s.egzersizId)} className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-full hover:bg-green-50 text-green-500">+</button>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={kaydet}
        className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
      >
        Antrenmanı Kaydet ve Ata
      </button>
    </div>
  );
}