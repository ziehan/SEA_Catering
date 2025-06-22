"use client";

import React, { useEffect, useState, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { ChefHat, Truck, BarChart3, Leaf, LucideIcon } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import cateringImage from "@/assets/image/catering.jpg";
import deliveryImage from "@/assets/image/delivery.jpg";
import nutritionImage from "@/assets/image/nutrition.jpg";
import ingredientsImage from "@/assets/image/ingredients.jpg";

type ColorKeys = keyof typeof colorClasses;

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  color: ColorKeys;
  bgImage: StaticImageData;
  alt: string;
}

const features: Feature[] = [
  // ================================================================
  {
    title: "Customizable Catering",
    description:
      "Choose from our wide range of healthy menus or create your own meal plan to suit your taste, calorie needs and dietary preferences. Full flexibility for you.",
    icon: ChefHat,
    color: "rose",
    bgImage: cateringImage,
    alt: "A variety of healthy catering foods served on the table.",
  },
  {
    title: "Nationwide Delivery",
    description:
      "We cover all major cities in Indonesia. Order from anywhere and we will make sure your healthy food arrives on time at your doorstep, fresh and ready to eat.",
    icon: Truck,
    color: "blue",
    bgImage: deliveryImage,
    alt: "Couriers ride motorbikes to deliver food packages.",
  },
  {
    title: "Detailed Nutrition Info",
    description:
      "Each dish comes with complete and transparent nutritional information. Know the amount of calories, protein, fat, and carbohydrates to support your health goals.",
    icon: BarChart3,
    color: "emerald",
    bgImage: nutritionImage,
    alt: "A serving of healthy food with a nutritional information label next to it.",
  },
  {
    title: "Fresh & Quality Ingredients",
    description:
      "We use only selected fresh ingredients from trusted local suppliers. Without preservatives, every bite is a guarantee of the best quality and taste.",
    icon: Leaf,
    color: "green",
    bgImage: ingredientsImage,
    alt: "A variety of vegetables and fresh ingredients on a cutting board.",
  },
];

const colorClasses = {
  rose: {
    card: "from-rose-50/80 via-rose-25/60 to-white/90",
    iconContainer: "bg-gradient-to-br from-rose-400 to-rose-600",
    iconText: "text-rose-700",
    accent: "rose-400",
    shadow: "shadow-rose-200/50",
    glow: "shadow-rose-400/30",
  },
  blue: {
    card: "from-blue-50/80 via-blue-25/60 to-white/90",
    iconContainer: "bg-gradient-to-br from-blue-400 to-blue-600",
    iconText: "text-blue-700",
    accent: "blue-400",
    shadow: "shadow-blue-200/50",
    glow: "shadow-blue-400/30",
  },
  emerald: {
    card: "from-emerald-50/80 via-emerald-25/60 to-white/90",
    iconContainer: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    iconText: "text-emerald-700",
    accent: "emerald-400",
    shadow: "shadow-emerald-200/50",
    glow: "shadow-emerald-400/30",
  },
  green: {
    card: "from-green-50/80 via-green-25/60 to-white/90",
    iconContainer: "bg-gradient-to-br from-green-400 to-green-600",
    iconText: "text-green-700",
    accent: "green-400",
    shadow: "shadow-green-200/50",
    glow: "shadow-green-400/30",
  },
};

const FloatingParticles = ({ color }: { color: string }) => {
  const [particles, setParticles] = useState<{ top: string; left: string }[]>(
    []
  );

  useEffect(() => {
    const newParticles = [...Array(8)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setParticles(newParticles);
  }, []);
  if (particles.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((style, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 bg-${color} rounded-full opacity-60`}
          style={style}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 10 - 5, 0],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const ParallaxCard = ({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]),
    { stiffness: 100, damping: 30, restDelta: 0.001 }
  );
  const imageScale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]),
    { stiffness: 100, damping: 30 }
  );
  const contentX = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.3, 0.7, 1],
      [
        index % 2 === 0 ? "15%" : "-15%",
        "0%",
        "0%",
        index % 2 === 0 ? "-5%" : "5%",
      ]
    ),
    { stiffness: 100, damping: 30 }
  );
  const contentRotate = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      [index % 2 === 0 ? 2 : -2, 0, index % 2 === 0 ? -1 : 1]
    ),
    { stiffness: 100, damping: 30 }
  );
  const cardOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.7, 1, 1, 0.7]
  );
  const Icon = feature.icon;
  const colors = colorClasses[feature.color];

  return (
    <motion.div
      ref={cardRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch"
      style={{ opacity: cardOpacity }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.1,
      }}
    >
      <motion.div
        className={`relative overflow-hidden rounded-3xl ${colors.shadow} shadow-2xl h-80 md:h-96 ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}
        whileHover={{
          scale: 1.02,
          rotateY: index % 2 === 0 ? 5 : -5,
          transition: { duration: 0.6, ease: "easeOut" },
        }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y: imageY, scale: imageScale }}
        >
          <Image
            src={feature.bgImage}
            alt={feature.alt}
            fill
            className="object-cover"
            placeholder="blur"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <FloatingParticles color={colors.accent} />
        <motion.div
          className="absolute top-6 right-6 w-16 h-16 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl"
          whileHover={{
            scale: 1.1,
            rotate: 360,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon className={`w-8 h-8 text-${colors.accent}`} />
        </motion.div>
        <motion.div
          className={`absolute inset-0 rounded-3xl opacity-0 ${colors.glow} shadow-2xl`}
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      <motion.div
        className={`relative flex flex-col justify-center ${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}
        style={{ x: contentX, rotate: contentRotate }}
      >
        <motion.div
          className={`p-8 md:p-10 rounded-3xl bg-gradient-to-br ${colors.card} backdrop-blur-sm shadow-2xl ${colors.shadow} border border-white/50`}
          whileHover={{
            scale: 1.02,
            y: -5,
            transition: { duration: 0.4, ease: "easeOut" },
          }}
        >
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className={`w-14 h-14 ${colors.iconContainer} rounded-2xl flex items-center justify-center shadow-lg`}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.3 },
              }}
              animate={{
                boxShadow: [
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Icon className="w-7 h-7 text-white" />
            </motion.div>
            <motion.h3
              className={`text-2xl md:text-3xl font-serif ${colors.iconText}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {feature.title}
            </motion.h3>
          </motion.div>
          <motion.p
            className="text-gray-700 leading-relaxed text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {feature.description}
          </motion.p>
          <motion.div
            className={`absolute -top-2 -right-2 w-4 h-4 bg-${colors.accent} rounded-full opacity-70`}
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className={`absolute -bottom-1 -left-1 w-3 h-3 bg-${colors.accent} rounded-full opacity-50`}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const headerY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]),
    { stiffness: 100, damping: 30 }
  );
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={containerRef}
      className="relative bg-gray-100 text-black py-20 md:py-32 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-20 left-10 w-32 h-32 bg-rose-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-200/20 rounded-full blur-2xl" />
        <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-purple-200/20 rounded-full blur-2xl" />
      </motion.div>
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          className="text-center mb-20 md:mb-28"
          style={{ y: headerY }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-serif title-page pb-2"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Why SEA Catering?
          </motion.h2>
          <motion.p
            className="max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            We are more than just catering. We are your partner in achieving a
            healthier lifestyle that is easier and more enjoyable.
          </motion.p>
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-rose-400 via-blue-400 to-green-400 rounded-full"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ backgroundSize: "200% 100%" }}
            />
          </motion.div>
        </motion.div>
        <div className="space-y-24 md:space-y-32">
          {features.map((feature, index) => (
            <ParallaxCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
        <motion.div
          className="flex flex-col md:flex-row justify-center items-center gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            className="flex flex-col md:flex-row justify-center items-center mt-24 gap-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <a href="/menu">
              <motion.button
                className="group relative inline-flex items-center gap-3 border-2 border-gray-800/20 bg-white/80 backdrop-blur-sm px-10 h-16 rounded-2xl text-black/80 font-semibold text-lg shadow-xl overflow-hidden hover:bg-white hover:text-black transition-colors duration-300 ease-in-out"
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <span className="relative z-10">See Menu</span>
                <div className="absolute inset-0 bg-gray-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
              </motion.button>
            </a>

            <a href="/subscription">
              <motion.button
                className="group relative inline-flex items-center gap-3 border-2 border-transparent bg-gray-950 text-white/80 h-16 px-10 rounded-2xl font-semibold text-lg shadow-xl overflow-hidden hover:bg-gray-800 hover:text-white transition-colors duration-300 ease-in-out"
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <span className="relative z-10">Subscribe Now</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
              </motion.button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
