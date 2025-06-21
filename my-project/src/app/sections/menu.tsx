"use client";

import React, { useState } from "react";
import Image from "next/image";
// import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { X, Clock, Users, Zap, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MENU_DATA, MenuItemType, PlanType } from "@/lib/menu-data";

type ActiveSubscription = {
  _id: string;
  planName: string;
} | null;

interface MenuProps {
  activeSubscription: ActiveSubscription;
}
interface MenuItemProps {
  item: MenuItemType;
  className?: string;
  onClick: () => void;
}
interface PopupProps {
  item: MenuItemType | null;
  isOpen: boolean;
  onClose: () => void;
  activeSubscription: ActiveSubscription;
}

const HOVER_ANIMATION = {
  scale: 1.02,
  transition: { type: "spring", stiffness: 400, damping: 20 },
};
const PLAN_STYLES: Record<PlanType, string> = {
  "Diet Plan": "bg-emerald-500 text-white",
  "Protein Plan": "bg-rose-500 text-white",
  "Royal Plan": "bg-amber-500 text-black",
};
const gridContainerVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const gridItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  className = "",
  onClick,
}) => {
  return (
    <motion.div variants={gridItemVariants} className={className}>
      <motion.div
        whileHover={HOVER_ANIMATION}
        className="relative h-full w-full rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-shadow duration-300"
        onClick={onClick}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div
          className={`absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg ${PLAN_STYLES[item.planType]}`}
        >
          {item.planType.replace(" Plan", "").toUpperCase()}
        </div>
        {item.isFeatured && (
          <div className="absolute top-4 left-4 bg-white/90 text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            FEATURED
          </div>
        )}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 text-white ${item.isFeatured ? "sm:p-6" : ""}`}
        >
          <item.icon
            className={`mb-3 text-white/90 ${item.isFeatured ? "w-8 h-8" : "w-6 h-6"}`}
          />
          <h3
            className={`font-bold leading-tight mb-2 ${item.isFeatured ? "text-xl sm:text-2xl" : "text-lg"}`}
          >
            {item.title}
          </h3>
          <div className="flex items-center justify-between">
            <span
              className={`font-semibold ${item.isFeatured ? "text-lg" : "text-sm"}`}
            >
              {item.price}
            </span>
            <span
              className={`text-white/80 ${item.isFeatured ? "text-sm" : "text-xs"}`}
            >
              {item.cookingTime}
            </span>
          </div>
          {item.isFeatured && (
            <div className="mt-3 pt-3 border-t border-white/20">
              <p className="text-sm text-white/90 line-clamp-2">
                {item.description}
              </p>
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/95 text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm shadow-lg">
            View Details
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const MenuPopup: React.FC<PopupProps> = ({
  item,
  isOpen,
  onClose,
  activeSubscription,
}) => {
  const { status } = useSession();
  const router = useRouter();

  if (!item) return null;

  const handleOrderClick = () => {
    if (status !== "authenticated") {
      router.push("/auth/login");
      return;
    }

    if (activeSubscription) {
      if (activeSubscription.planName === item.planType) {
        router.push(`/auth/subscription/edit/${activeSubscription._id}`);
      } else {
        toast.error(
          `You are on the ${activeSubscription.planName}. Please manage it on your profile.`,
          { icon: <AlertTriangle className="text-red-500" /> }
        );
      }
    } else {
      router.push(
        `/subscription/form?plan=${encodeURIComponent(item.planType)}`
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-72 rounded-t-3xl overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-6 right-6 bg-white/90 hover:bg-white rounded-full p-2.5 transition-colors shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-6 left-6 bg-white/95 rounded-full p-4 shadow-lg">
                <item.icon className="w-7 h-7 text-gray-700" />
              </div>
              {item.isFeatured && (
                <div className="absolute top-6 left-6 bg-amber-500 text-black text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                  FEATURED ITEM
                </div>
              )}
            </div>
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {item.title}
                  </h2>
                  <span
                    className={`text-sm font-bold px-4 py-2 rounded-full ${PLAN_STYLES[item.planType]}`}
                  >
                    {item.planType}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600">
                    {item.price}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                {item.description}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="font-semibold text-gray-700">
                      Cooking Time
                    </span>
                  </div>
                  <div className="text-xl font-bold text-blue-600">
                    {item.cookingTime}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <Users className="w-5 h-5 mr-2 text-green-600" />
                    <span className="font-semibold text-gray-700">
                      Servings
                    </span>
                  </div>
                  <div className="text-xl font-bold text-green-600">
                    {item.servings} people
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-xl mb-4 flex items-center text-gray-800">
                  <Zap className="w-6 h-6 mr-2 text-orange-500" />
                  Nutrition Facts
                </h3>
                <div className="grid grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500 mb-1">
                      {item.nutrition.calories}
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      Calories
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500 mb-1">
                      {item.nutrition.protein}
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      Protein
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500 mb-1">
                      {item.nutrition.carbs}
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      Carbs
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-500 mb-1">
                      {item.nutrition.fat}
                    </div>
                    <div className="text-xs text-gray-600 font-medium">Fat</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500 mb-1">
                      {item.nutrition.fiber}
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      Fiber
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleOrderClick}
                className="block w-full text-center bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-4 rounded-2xl font-bold text-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                Order This Plan
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const Menu: React.FC<MenuProps> = ({ activeSubscription }) => {
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const [visibleItemsCount, setVisibleItemsCount] = useState(15);
  const handleItemClick = (item: MenuItemType) => setSelectedItem(item);
  const handleClosePopup = () => setSelectedItem(null);
  const handleSeeMore = () => setVisibleItemsCount(MENU_DATA.length);

  return (
    <>
      <section className="p-6 sm:p-8 md:p-12 min-h-screen mt-12 mb-12 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 title-page font-serif pb-1">
              Explore Our Daily Dishes
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our carefully curated selection of healthy, delicious
              meals designed to support your lifestyle goals.
            </p>
          </div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[280px]"
            variants={gridContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {MENU_DATA.slice(0, visibleItemsCount).map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                onClick={() => handleItemClick(item)}
                className={
                  item.isFeatured
                    ? "md:col-span-2 md:row-span-2"
                    : "col-span-1 row-span-1"
                }
              />
            ))}
          </motion.div>
          {visibleItemsCount < MENU_DATA.length && (
            <div className="text-center mt-12">
              <motion.button
                onClick={handleSeeMore}
                className="bg-emerald-500 text-white font-bold text-lg py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                See More
              </motion.button>
            </div>
          )}
        </div>
      </section>
      <MenuPopup
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={handleClosePopup}
        activeSubscription={activeSubscription}
      />
    </>
  );
};
