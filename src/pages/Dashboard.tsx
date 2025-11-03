import DashboardSection from "@/components/karmic/DashboardSection";
import AdminSection from "@/components/karmic/AdminSection";
import Footer from "@/components/karmic/Footer";

const Dashboard = () => {
  const role = localStorage.getItem("role"); // fetched from signin/signup
  return (
    <main className="min-h-screen">
      {role === "chef" ? <AdminSection /> : <DashboardSection />}
      <Footer />
    </main>
  );
};

export default Dashboard;