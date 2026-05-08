import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import type{Rol} from "../auth/AuthContext"
import type { JSX } from "react";

type Props = {
  children: JSX.Element;
  izinliRoller: Rol[];
};

export default function ProtectedRoute({ children, izinliRoller }: Props) {
  const { kullanici } = useAuth();

  // 🔒 Giriş yoksa → misafir → giriş sayfası
  if (!kullanici) {
    return <Navigate to="/giris" replace />;
  }

  // 🔒 Rol yetkisi yoksa → kendi ana sayfasına
  if (!izinliRoller.includes(kullanici.rol)) {
    if (kullanici.rol === "ADMIN") return <Navigate to="/admin" replace />;
    if (kullanici.rol === "KOC") return <Navigate to="/koc" replace />;
    return <Navigate to="/kullanici" replace />;
  }

  return children;
}