import { Header } from "@/app/sections/header";
import { Footer } from "@/app/sections/footer";
import { SubscriptionPlans } from "@/app/subscription/sections/subscription";

export default function Home() {
  return (
    <main>
      <Header />
      <SubscriptionPlans />
      <Footer />
    </main>
  );
}
