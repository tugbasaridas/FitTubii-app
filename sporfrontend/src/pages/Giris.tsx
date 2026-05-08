import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function Giris() {
  const { girisYap } = useAuth();

  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");

  const submit = async () => {
    try {
      await girisYap(email, sifre);
    } catch {
      console.log("Giriş hatası");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-pink-100 to-slate-100 flex items-center justify-center px-6">
      
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 space-y-6">
        
        <h2 className="text-3xl font-extrabold text-center text-slate-900">
          Giriş Yap
        </h2>

        <div className="space-y-4">
          <input
            placeholder="Email"
            className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Şifre"
            className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
          />
        </div>

        <button
          onClick={submit}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-500 transition shadow-md"
        >
          Giriş Yap
        </button>

      </div>
    </div>
  );
}