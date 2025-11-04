import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import AdminSection from "@/components/karmic/AdminSection";
import DashboardSection from "@/components/karmic/DashboardSection";
import Footer from "@/components/karmic/Footer";

const DashboardRouter = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const roleFromQuery = params.get("role");

  const storedRole =
    typeof window !== "undefined" ? localStorage.getItem("role") : null;
  const role = roleFromQuery || storedRole;

  return (
    <main className="min-h-screen">
      {role === "chef" ? <AdminSection /> : <DashboardSection />}
      <Footer />
    </main>
  );
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/dashboard" element={<DashboardRouter />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
