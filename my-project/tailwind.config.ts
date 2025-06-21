import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
      },
      keyframes: {
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        zoom: {
          from: { transform: "scale(1)" },
          to: { transform: "scale(1.05)" },
        },
        glow: {
          from: { textShadow: "0 0 5px rgba(255, 255, 255, 0.3)" },
          to: {
            textShadow:
              "0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4)",
          },
        },
        shimmer: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(255, 255, 255, 0.1)" },
          "50%": { boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)" },
        },
      },
      animation: {
        slideUp: "slideUp 1s ease-out 0.5s both",
        fadeIn: "fadeIn 1s ease-out 0.8s both",
        float: "float 8s ease-in-out infinite",
        zoom: "zoom 20s ease-in-out infinite alternate",
        glow: "glow 2s ease-in-out infinite alternate",
        shimmer: "shimmer 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
