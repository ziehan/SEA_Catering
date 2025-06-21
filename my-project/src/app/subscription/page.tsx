import { Header } from "@/app/sections/header";
import { Footer } from "@/app/sections/footer";
import { SubscriptionPlans } from "@/app/sections/subscription";

export default function Home() {
  return (
    <main>
      <Header />
      <SubscriptionPlans />
      <Footer />
    </main>
  );
}
