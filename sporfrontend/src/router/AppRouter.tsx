import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import ProtectedRoute from "../auth/ProtectedRoute";
import type { JSX } from "react";

// Sayfa İthalatları
import Giris from "../pages/Giris";
import Kayit from "../pages/Kayit";
import AnaSayfa from "../pages/Anasayfa";
import Egzersizler from "../pages/Egzersizler";
import KocSayfa from "../pages/koc/KocAnasayfa";
import KullaniciSec from "../pages/koc/KullaniciSec";
import AntrenmanOlustur from "../pages/koc/KocAntrenmanOlustur";
import AdminLayout from "../pages/admin/AdminLayout";
import AdminSayfa from "../pages/admin/AdminAnasayfa";
import EgzersizYonetimi from "../pages/admin/AdminEgzersizler";
import AdminKullanicilar from "../pages/admin/AdminKullanicilar";
import KocTakipSayfasi from "../pages/koc/KocTakipSayfasi";
import DanisanDetay from "../pages/koc/DanisanDetay";
import SporcuSayfa from "../pages/user/SporcuAnasayfa";
import AntrenmanYap from "../pages/user/AntrenmanYap";
import SerbestAntrenmanEkle from "../pages/user/SerbestAntrenmanEkle";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { kullanici } = useAuth();
  
  if (kullanici) {
    if (kullanici.rol === "KOC") return <Navigate to="/koc" replace />;
    if (kullanici.rol === "ADMIN") return <Navigate to="/admin" replace />;
    return <Navigate to="/kullanici" replace />;
  }
  return children;
};

export default function AppRouter() {
  return (
    <Routes>
      {/* MİSAFİR ROTALARI */}
      <Route path="/" element={<PublicRoute><AnaSayfa /></PublicRoute>} />
      <Route path="/giris" element={<PublicRoute><Giris /></PublicRoute>} />
      <Route path="/kayit" element={<PublicRoute><Kayit /></PublicRoute>} />
      <Route path="/egzersizler" element={<Egzersizler />} />

      {/* USER (SPORCU) ROTALARI */}
      <Route path="/kullanici" element={<ProtectedRoute izinliRoller={["USER"]}><SporcuSayfa /></ProtectedRoute>} />
      <Route path="/antrenman-yap/:id" element={<ProtectedRoute izinliRoller={["USER"]}><AntrenmanYap /></ProtectedRoute>} />
      <Route path="/serbest-ekle" element={<ProtectedRoute izinliRoller={["USER"]}><SerbestAntrenmanEkle /></ProtectedRoute>} />

      {/* KOC ROTALARI */}
      <Route path="/koc" element={<ProtectedRoute izinliRoller={["KOC"]}><KocSayfa /></ProtectedRoute>} />
      <Route path="/koc/kullanici/:id" element={<ProtectedRoute izinliRoller={["KOC"]}><DanisanDetay /></ProtectedRoute>} />
      <Route path="/koc/antrenmanlar" element={<ProtectedRoute izinliRoller={["KOC"]}><KocTakipSayfasi /></ProtectedRoute>} />
      <Route path="/koc/antrenman-olustur" element={<ProtectedRoute izinliRoller={["KOC"]}><KullaniciSec /></ProtectedRoute>} />
      <Route path="/koc/antrenman-olustur/:kullaniciId" element={<ProtectedRoute izinliRoller={["KOC"]}><AntrenmanOlustur /></ProtectedRoute>} />

      {/* ADMIN ROTALARI */}
      <Route path="/admin" element={<ProtectedRoute izinliRoller={["ADMIN"]}><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminSayfa />} />
        <Route path="egzersizler" element={<EgzersizYonetimi />} />
        <Route path="kullanicilar" element={<AdminKullanicilar />} />
      </Route>
    </Routes>
  );
}