import { Header } from "@/app/sections/header";
import { SubscriptionForm } from "@/app/subscription/form/sections/subscriptionform";
import { Footer } from "@/app/sections/footer";

export default function Home() {
  return (
    <main>
      <Header />
      <SubscriptionForm />
      <Footer />
    </main>
  );
}
