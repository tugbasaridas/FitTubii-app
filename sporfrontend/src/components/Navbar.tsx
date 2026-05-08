import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { kullanici, cikisYap } = useAuth();
  const logoHedef = !kullanici 
    ? "/" 
    : kullanici.rol === "KOC" 
      ? "/koc" 
      : kullanici.rol === "ADMIN"
        ? "/admin"
        : "/kullanici";

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to={logoHedef} className="text-xl font-black text-indigo-600">
          FitTubii
        </Link>

        <div className="flex items-center gap-6 font-semibold text-slate-700">
          {!kullanici && (
            <>
              <Link to="/" className="hover:text-indigo-600">
                Anasayfa
              </Link>
              <Link to="/egzersizler" className="hover:text-indigo-600">
                Egzersizler
              </Link>
              <Link to="/giris" className="hover:text-indigo-600">
                Giriş
              </Link>
              <Link
                to="/kayit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700"
              >
                Kayıt Ol
              </Link>
            </>
          )}

          {kullanici?.rol === "USER" && (
            <>
              <Link to="/kullanici" className="hover:text-indigo-600">
                Panelim
              </Link>
              <Link to="/egzersizler" className="hover:text-indigo-600">
                Egzersizler
              </Link>
              <button
                onClick={cikisYap}
                className="text-red-500 hover:text-red-600"
              >
                Çıkış
              </button>
            </>
          )}

          {kullanici?.rol === "KOC" && (
            <>
              <Link to="/koc" className="hover:text-indigo-600">
                Koç Paneli
              </Link>

              <button
                onClick={cikisYap}
                className="text-red-500 hover:text-red-600"
              >
                Çıkış
              </button>
            </>
          )}

          {kullanici?.rol === "ADMIN" && (
            <>
              <Link to="/admin" className="hover:text-indigo-600">
                Admin Panel
              </Link>
              <Link to="/admin/kullanicilar" className="hover:text-indigo-600">
                Kullanıcılar
              </Link>
              <Link to="/admin/egzersizler" className="hover:text-indigo-600">
                Yönetimi
              </Link>
              <button
                onClick={cikisYap}
                className="text-red-500 hover:text-red-600"
              >
                Çıkış
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
