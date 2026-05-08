import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="p-6">
      

      {/* 🔽 ALT SAYFALAR BURAYA GELECEK */}
      <Outlet />
    </div>
  );
}
