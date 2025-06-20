"use client";

import React from "react";
import { motion } from "framer-motion";
import { Leaf, Flame, Crown, Check } from "lucide-react";

const plans = [
  {
    name: "Diet Plan",
    price: 30000,
    priceSuffix: "/ meal",
    description:
      "Perfect for those looking to manage calorie intake with delicious, balanced meals.",
    features: [
      "Calorie-controlled meals",
      "Rich in fiber and vitamins",
      "Weekly rotating menu",
      "Focus on weight management",
    ],
    icon: Leaf,
    colors: {
      primary: "emerald",
      buttonText: "white",
    },
  },
  {
    name: "Protein Plan",
    price: 40000,
    priceSuffix: "/ meal",
    description:
      "Designed to boost muscle growth and athletic performance with high-quality protein.",
    features: [
      "High-protein servings",
      "Supports muscle recovery",
      "Energy-boosting carbs",
      "Ideal for active lifestyles",
    ],
    icon: Flame,
    colors: {
      primary: "rose",
      buttonText: "white",
    },
  },
  {
    name: "Royal Plan",
    price: 60000,
    priceSuffix: "/ meal",
    description:
      "The ultimate gourmet experience with premium ingredients and exclusive dishes.",
    features: [
      "Gourmet & premium ingredients",
      "Exclusive chef-curated menu",
      "Maximum flavor & nutrition",
      "The best we have to offer",
    ],
    icon: Crown,
    colors: {
      primary: "amber",
      buttonText: "white",
    },
  },
];

// Varian animasi untuk container dan item
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Setiap kartu akan muncul dengan jeda 0.2 detik
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

// Objek untuk memetakan warna ke kelas Tailwind, agar Tailwind bisa mendeteksinya
const colorStyles = {
  emerald: {
    text: "text-emerald-500",
    bg: "bg-emerald-500",
    hoverBg: "hover:bg-emerald-600",
    ring: "ring-emerald-500",
  },
  rose: {
    text: "text-rose-500",
    bg: "bg-rose-500",
    hoverBg: "hover:bg-rose-600",
    ring: "ring-rose-500",
  },
  amber: {
    text: "text-amber-500",
    bg: "bg-amber-500",
    hoverBg: "hover:bg-amber-600",
    ring: "ring-amber-500",
  },
};

// Komponen utama
export const Subscription = () => {
  return (
    <section className="min-h-screen bg-gray-50 py-16 sm:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-700 to-green-500 bg-clip-text text-transparent font-serif">
            Choose Your Perfect Plan
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We offer a variety of subscription plans to fit your health goals
            and lifestyle.
          </p>
        </div>

        {/* Grid untuk Kartu Plan */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {plans.map((plan) => {
            const Icon = plan.icon;
            const styles =
              colorStyles[plan.colors.primary as keyof typeof colorStyles];

            return (
              <motion.div
                key={plan.name}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }} // Animasi saat hover
                className="flex flex-col bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
              >
                {/* Bagian Atas Kartu */}
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <Icon className={`w-10 h-10 ${styles.text}`} />
                    <h2 className="text-2xl font-bold font-serif text-gray-800">
                      {plan.name}
                    </h2>
                  </div>
                  <p className="text-gray-500 text-sm">{plan.description}</p>
                  <div className="mt-6">
                    <span className={`text-5xl font-bold ${styles.text}`}>
                      {new Intl.NumberFormat("id-ID").format(plan.price)}
                    </span>
                    <span className="text-lg font-medium text-gray-500">
                      {plan.priceSuffix}
                    </span>
                  </div>
                </div>

                {/* Bagian Bawah Kartu (Fitur) */}
                <div className="p-8 pt-0 flex-grow flex flex-col">
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tombol Interaktif */}
                  <button
                    className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-all duration-300 shadow-md
                      ${styles.bg} ${styles.hoverBg} text-${plan.colors.buttonText}
                      focus:outline-none focus:ring-4 ${styles.ring}
                    `}
                  >
                    Choose Plan
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
