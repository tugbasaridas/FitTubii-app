import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

type Kullanici = {
  id: number;
  ad: string;
  email: string;
};

export default function KullaniciSec() {
  const [kullanicilar, setKullanicilar] = useState<Kullanici[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/kullanicilar/koc").then(res => {
      setKullanicilar(res.data);
    }).finally(() => setLoading(false));
  }, []);

  const secKullanici = (id: number) => {
    navigate(`/koc/antrenman-olustur/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-black">Antrenman Atamak için Kullanıcı Seç</h1>
      {loading && <p>Yükleniyor…</p>}
      {kullanicilar.map(k => (
        <div
          key={k.id}
          className="border p-4 rounded flex justify-between items-center hover:bg-slate-50 cursor-pointer"
          onClick={() => secKullanici(k.id)}
        >
          <div>
            <p className="font-bold">{k.ad}</p>
            <p className="text-sm text-slate-500">{k.email}</p>
          </div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded font-bold">
            Seç
          </button>
        </div>
      ))}
    </div>
  );
}
