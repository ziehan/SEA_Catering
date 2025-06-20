import { Header } from "@/app/sections/header";
import { Hero } from "@/app/sections/hero";
import { About } from "@/app/sections/about";
import { Testimoni } from "@/app/sections/testimoni";
import { Footer } from "@/app/sections/footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Testimoni />
      <Footer />
    </main>
  );
}
