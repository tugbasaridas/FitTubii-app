import { useAuth } from "../../auth/AuthContext";
import { Link } from "react-router-dom"; 

export default function AdminAnasayfa() {
  const { kullanici, cikisYap } = useAuth();

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 via-rose-100 to-slate-100 flex flex-col items-center justify-center px-4">
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 max-w-xl w-full text-center border border-white/40">
        
        <h1 className="text-4xl font-black text-red-500 mb-4 tracking-tight">
          🛠 Admin Paneli
        </h1>

        <p className="text-slate-600 mb-6 leading-relaxed">
          Yönetim ekranındasın.  
          Egzersizleri, kullanıcıları ve içerikleri buradan yönetebilirsin.
        </p>

        <div className="bg-red-50/70 rounded-2xl p-4 mb-6 text-sm text-red-600 border border-red-100">
          <p><strong>ID:</strong> {kullanici?.id}</p>
          <p><strong>Rol:</strong> {kullanici?.rol}</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          
          <Link 
            to="/admin/egzersizler" 
            className="py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-400 transition shadow-md"
          >
            Egzersiz Yönetimi
          </Link>

          <Link 
            to="/admin/kullanicilar" 
            className="py-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition shadow-md"
          >
            Kullanıcı Yönetimi
          </Link>

          <button
            onClick={() => {
              console.log("Çıkış yapılıyor...");
              cikisYap();
            }}
            className="py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition"
          >
            Çıkış Yap
          </button>

        </div>
      </div>
    </div>
  );
}