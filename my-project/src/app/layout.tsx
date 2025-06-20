import type { Metadata } from "next";
import { Inter, Calistoga } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const calistoga = Calistoga({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "SEA Catering",
  description: "SEA Catering Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          inter.variable,
          calistoga.variable,
          "bg-white text-black antialiased font-sans"
        )}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
