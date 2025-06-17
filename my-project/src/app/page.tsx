import { Header } from "@/sections/header";
import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Testimoni } from "@/sections/testimoni";
import { Footer } from "@/sections/footer";

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
