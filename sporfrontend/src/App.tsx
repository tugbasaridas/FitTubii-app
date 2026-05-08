import AppRouter from "./router/AppRouter";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <AppRouter />
    </div>
  );
}
