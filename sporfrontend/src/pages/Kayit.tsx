import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Kayit() {
  const { kayitOl } = useAuth();
  const navigate = useNavigate();

  const [ad, setAd] = useState("");
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");

  const submit = async () => {
    if (sifre.length < 4) {
      toast.error("Şifre en az 4 harfli olmalı");
      return;
    }

    try {
      await kayitOl(ad, email, sifre);
      navigate("/giris");
    } catch (err) {
      toast.error("Kayıt başarısız");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-pink-100 to-slate-100 flex items-center justify-center px-6">
      
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 space-y-6">
        
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Yeni Hesap
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
            FitTubii'ye Katıl
          </h2>

          <p className="mt-2 text-slate-600 text-sm">
            Sağlıklı yaşam için ilk adımı at.
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Ad Soyad"
            value={ad}
            onChange={(e) => setAd(e.target.value)}
            className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="email"
            placeholder="ornek@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="password"
            placeholder="Şifre"
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
            className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          onClick={submit}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-500 transition shadow-md"
        >
          Kayıt Ol
        </button>

        <p className="text-sm text-center text-slate-600">
          Zaten hesabın var mı?{" "}
          <Link to="/giris" className="text-indigo-600 font-semibold hover:underline">
            Giriş Yap
          </Link>
        </p>

      </div>
    </div>
  );
}