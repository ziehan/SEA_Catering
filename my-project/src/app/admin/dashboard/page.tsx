import { Header } from "@/app/sections/header";
import { AdminDashboardClient } from "@/app/sections/admindashboard";
import { Footer } from "@/app/sections/footer";

export default function AdminDashboardPage() {
  return (
    <main>
      <Header />
      <AdminDashboardClient />
      <Footer />
    </main>
  );
}
