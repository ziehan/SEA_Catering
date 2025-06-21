"use client";

import Image from "next/image";
import Link from "next/link";
import HeroBg from "@/assets/image/herobg.jpg";
import { useSession } from "next-auth/react"; // Impor useSession

export const Hero = () => {
  const { data: session } = useSession(); // Dapatkan data sesi

  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Background Image menggunakan kelas animasi baru */}
      <Image
        src={HeroBg}
        alt="Latar belakang makanan sehat untuk SEA Catering"
        fill
        className="-z-10 object-cover animate-zoom" // <-- Diubah
        priority
        placeholder="blur"
      />

      <div className="absolute inset-0 bg-black/60 -z-10"></div>

      {/* Floating particles (bisa disederhanakan atau dibiarkan) */}
      <div className="absolute inset-0 -z-5">
        <div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-float"
          style={{ animationDuration: "6s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-float"
          style={{ animationDirection: "reverse", animationDuration: "8s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white/25 rounded-full animate-float"
          style={{ animationDuration: "7s", animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="relative z-10 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-serif text-4xl md:text-6xl text-center tracking-wide text-white animate-slideUp hover:animate-glow">
            SEA Catering
          </h1>

          <div className="flex flex-col items-center animate-slideUp [animation-delay:0.3s]">
            <div className="border-2 border-white/20 px-4 py-1.5 inline-flex items-center gap-4 rounded-lg mt-2 backdrop-blur-sm bg-white/5 hover:border-white/40 hover:bg-white/10 hover:scale-105 transition-all duration-500 ease-out animate-shimmer">
              <div className="text-sm font-medium text-white/80">
                Healthy Meals, Anytime, Anywhere
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-white/60 md:text-lg animate-fadeIn hover:text-white/80 transition-colors duration-300">
            Serve healthy living with a delicious catering menu that can be
            customized and delivered right to your doorstep throughout
            Indonesia.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4 animate-slideUp [animation-delay:0.6s]">
          <Link href="/menu" className="group">
            <button className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-6 h-12 rounded-xl text-white hover:bg-white/30 hover:border-white/40 hover:scale-105 hover:shadow-lg hover:shadow-white/20 transition-all duration-500 ease-out active:scale-95 relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
              <span className="font-semibold relative z-10">See Menu</span>
            </button>
          </Link>

          {/* Tombol subscribe hanya muncul jika user BUKAN admin */}
          {session?.user?.role !== "admin" && (
            <Link href="/subscription" className="group">
              <button className="inline-flex items-center gap-2 border border-white bg-white text-gray-900 h-12 px-6 rounded-xl hover:bg-white/90 hover:scale-105 hover:shadow-xl hover:shadow-white/30 transition-all duration-500 ease-out active:scale-95 relative overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
                <span className="font-semibold relative z-10">
                  Subscribe Now
                </span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
