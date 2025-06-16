"use client";

import Image from "next/image";
import HeroBg from "@/assets/image/herobg.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-center">
      <Image
        src={HeroBg}
        alt="Latar belakang makanan sehat untuk SEA Catering"
        fill
        className="-z-10 object-cover"
        priority
        placeholder="blur"
      />

      <div className="absolute inset-0 bg-black/60 -z-10"></div>

      <div className="relative z-10 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-serif text-4xl md:text-6xl text-center tracking-wide text-white">
            SEA Catering
          </h1>
          <div className="flex flex-col items-center">
            <div className="border-3 border-white/20 px-4 py-1.5 inline-flex items-center gap-4 rounded-lg mt-2">
              <div className="text-sm font-medium text-white/80">
                Healthy Meals, Anytime, Anywhere
              </div>
            </div>
          </div>
          <p className="mt-5 text-center text-white/60 md:text-lg">
            Sajikan hidup sehat dengan menu katering lezat yang bisa disesuaikan
            dan diantar langsung ke depan pintu Anda di seluruh Indonesia.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4">
          <a href="#">
            <button className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-6 h-12 rounded-xl text-white hover hover:bg-white/30 transition ease-in-out duration-300">
              <span className="font-semibold">Lihat Menu</span>
            </button>
          </a>
          <a href="#">
            <button className="inline-flex items-center gap-2 border border-white bg-white text-gray-900 h-12 px-6 rounded-xl hover hover:bg-white/80 transition ease-in-out duration-300">
              <span className="font-semibold">Langganan Sekarang</span>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};
