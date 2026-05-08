import { useEffect, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";

type Kullanici = {
  id: number;
  ad: string;
  email: string;
  rol: string;
};

export default function AdminKullanicilar() {
  const [kullanicilar, setKullanicilar] = useState<Kullanici[]>([]);
  const [loading, setLoading] = useState(true);

  const kullanicilariGetir = async () => {
    try {
      setLoading(true);
      const res = await api.get("/kullanicilar"); // Backend: KullanicilarController -> tumKullanicilar()
      setKullanicilar(res.data);
    } catch (err) {
      toast.error("Kullanıcılar yüklenirken bir hata oluştu ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    kullanicilariGetir();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-800">👥 Kullanıcı Listesi</h1>
        <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-xl font-bold text-sm">
          Toplam: {kullanicilar.length} Kayıt
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-4 font-bold text-slate-600">ID</th>
              <th className="p-4 font-bold text-slate-600">Ad Soyad</th>
              <th className="p-4 font-bold text-slate-600">Email</th>
              <th className="p-4 font-bold text-slate-600">Yetki Rolü</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="p-10 text-center text-slate-400 italic">Veriler çekiliyor...</td>
              </tr>
            ) : kullanicilar.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-10 text-center text-slate-400">Henüz kayıtlı kullanıcı yok.</td>
              </tr>
            ) : (
              kullanicilar.map((k) => (
                <tr key={k.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                  <td className="p-4 text-slate-400 font-mono">#{k.id}</td>
                  <td className="p-4 font-semibold text-slate-800">{k.ad}</td>
                  <td className="p-4 text-slate-600">{k.email}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider ${
                      k.rol === 'ADMIN' ? 'bg-red-100 text-red-600' : 
                      k.rol === 'KOC' ? 'bg-indigo-100 text-indigo-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {k.rol}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}