import { Header } from "@/app/subscription/sections/header";
import { Subscription } from "@/app/subscription/sections/subscription";
import { Footer } from "@/app/subscription/sections/footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Subscription />
      <Footer />
    </main>
  );
}
