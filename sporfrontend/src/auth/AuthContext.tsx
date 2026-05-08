import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";

export type Rol = "ADMIN" | "KOC" | "USER";

type Kullanici = {
  id: number;
  rol: Rol;
};

type AuthContextType = {
  kullanici: Kullanici | null;
  girisYap: (email: string, sifre: string) => Promise<Rol>;
  kayitOl: (ad: string, email: string, sifre: string) => Promise<void>;
  cikisYap: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [kullanici, setKullanici] = useState<Kullanici | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    api
      .get("/auth/profile")
      .then((res) => {
        setKullanici({
          id: res.data.id,
          rol: res.data.rol,
        });
      })
      .catch(() => {
        localStorage.removeItem("token");
        setKullanici(null);
      });
  }, []);

  const girisYap = async (email: string, sifre: string): Promise<Rol> => {
    try {
      const res = await api.post("/auth/login", { email, sifre });

      const token = res.data.token || res.data.access_token;
      localStorage.setItem("token", token);

      const profil = await api.get("/auth/profile");

      const user: Kullanici = {
        id: profil.data.id,
        rol: profil.data.rol as Rol,
      };

      setKullanici(user);

      toast.success("Giriş başarılı 🎉");

      if (user.rol === "ADMIN") {
        navigate("/admin", { replace: true });
      } else if (user.rol === "KOC") {
        navigate("/koc", { replace: true });
      } else {
        navigate("/kullanici", { replace: true });
      }

      return user.rol;
    } catch {
      toast.error("Email veya şifre hatalı ❌");
      throw new Error("Login failed");
    }
  };

  const kayitOl = async (ad: string, email: string, sifre: string) => {
    try {
      await api.post("/auth/register", {
        ad,
        email,
        sifre,
      });

      toast.success("Kayıt başarılı, giriş yapabilirsiniz ✅");
      navigate("/giris");
    } catch (err: any) {
      const mesaj =
        err.response?.data?.message?.[0] ||
        "Kayıt sırasında hata oluştu ❌";

      toast.error(mesaj);
      throw err;
    }
  };

  const cikisYap = () => {
    localStorage.removeItem("token");
    setKullanici(null);
    navigate("/", { replace: true });
    toast("Çıkış yapıldı 👋");
  };

  return (
    <AuthContext.Provider
      value={{ kullanici, girisYap, kayitOl, cikisYap }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth AuthProvider içinde kullanılmalı");
  }
  return context;
}
