import { Link } from "react-router-dom";

export default function AnaSayfa() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-pink-100 to-slate-100 flex items-center justify-center px-6">
      
      <div className="w-full max-w-3xl rounded-3xl bg-white/80 backdrop-blur-lg px-12 py-16 shadow-2xl">
        
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">
            SPORTUBI
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto">
            Spor antrenmanlarını planla, ilerlemeni takip et ve hedeflerine daha hızlı ulaş.
          </p>
        </div>

        <div className="mt-12 grid gap-4">
          <Link
            to="/giris"
            className="w-full rounded-xl bg-indigo-600 py-4 text-center text-base font-semibold text-white transition hover:bg-indigo-500 shadow-md"
          >
            Giriş Yap
          </Link>

          <Link
            to="/kayit"
            className="w-full rounded-xl border border-indigo-500 py-4 text-center text-base font-semibold text-indigo-600 transition hover:bg-indigo-50"
          >
            Kayıt Ol
          </Link>

          <Link
            to="/egzersizler"
            className="w-full rounded-xl bg-slate-100 py-4 text-center text-base font-semibold text-slate-800 border border-slate-200 transition hover:bg-slate-200"
          >
            Misafir Devam Et
          </Link>
        </div>

      </div>
    </div>
  );
}