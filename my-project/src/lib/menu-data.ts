import { StaticImageData } from "next/image";
import {
  ChefHat,
  Leaf,
  Pizza,
  Sandwich,
  Salad,
  Fish,
  Users,
} from "lucide-react";

import saladImage from "@/assets/image/salad.jpg";
import saladPangsitImage from "@/assets/image/saladpangsit.jpg";
import saladPremImage from "@/assets/image/saladprem.jpg";
import sandwichTelorImage from "@/assets/image/sandwichtelor.jpg";
import salmonKecapAsinImage from "@/assets/image/salmonkecapasin.jpg";
import pizzaImage from "@/assets/image/pizza.jpg";

export type PlanType = "Diet Plan" | "Protein Plan" | "Royal Plan";

export interface NutritionInfo {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
}

export interface MenuItemType {
  id: number;
  title: string;
  planType: PlanType;
  image: StaticImageData;
  icon: React.ElementType;
  description: string;
  price: string;
  cookingTime: string;
  servings: number;
  nutrition: NutritionInfo;
  isFeatured?: boolean;
}

const IMAGES = [
  saladImage,
  saladPangsitImage,
  saladPremImage,
  sandwichTelorImage,
  salmonKecapAsinImage,
  pizzaImage,
];
const PLAN_TYPES: PlanType[] = ["Diet Plan", "Protein Plan", "Royal Plan"];
const PLAN_PRICES: Record<PlanType, number> = {
  "Diet Plan": 30000,
  "Protein Plan": 40000,
  "Royal Plan": 60000,
};
const FEATURED_INDICES = [0, 6, 15, 22];

export const MENU_DATA: MenuItemType[] = Array.from({ length: 30 }, (_, i) => {
  const titles = [
    "Grilled Chicken & Asparagus",
    "Spicy Tuna Salad Bowl",
    "Royal Wagyu Steak",
    "Lemon Herb Baked Dory",
    "Lean Beef Stir-Fry",
    "Golden Turmeric Chicken Curry",
    "Salmon Quinoa Bowl",
    "Vegan Lentil Soup",
    "Pesto Shrimp Zoodles",
    "Chicken Caesar Light Wrap",
    "Tofu & Edamame Power Bowl",
    "Blackened Fish Tacos",
    "Mediterranean Chickpea Salad",
    "Egg White & Spinach Omelette",
    "Classic Beef Rendang",
    "Teriyaki Glazed Tempeh",
    "Thai Green Curry Chicken",
    "Garlic Butter Shrimp",
    "Mushroom & Truffle Pasta",
    "Korean Bulgogi Beef Bowl",
    "Spinach Ricotta Stuffed Chicken",
    "Honey Glazed Salmon",
    "Avocado & Shrimp Salad",
    "Spicy Basil Minced Chicken",
    "Creamy Tuscan Salmon",
    "Vietnamese Pho Noodle Soup",
    "Black Pepper Beef",
    "Lemon Dill Fish Fillet",
    "Hearty Beef & Barley Soup",
    "Sundried Tomato Chicken Pasta",
  ];
  const icons = [
    ChefHat,
    Salad,
    ChefHat,
    Fish,
    ChefHat,
    ChefHat,
    Salad,
    Leaf,
    Salad,
    Sandwich,
    Leaf,
    Fish,
    Salad,
    ChefHat,
    ChefHat,
    Leaf,
    ChefHat,
    Fish,
    Pizza,
    ChefHat,
    ChefHat,
    Fish,
    Salad,
    ChefHat,
    Fish,
    Leaf,
    ChefHat,
    Fish,
    Leaf,
    Pizza,
  ];
  const currentPlanType = PLAN_TYPES[i % 3];
  return {
    id: i + 1,
    title: titles[i] || `Menu Item ${i + 1}`,
    planType: currentPlanType,
    image: IMAGES[i % 6],
    icon: icons[i] || ChefHat,
    description:
      "A healthy and delicious option, prepared with high-quality ingredients to support your healthy lifestyle.",
    price: new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(PLAN_PRICES[currentPlanType]),
    cookingTime: `${20 + (i % 15)} min`,
    servings: (i % 3) + 1,
    isFeatured: FEATURED_INDICES.includes(i),
    nutrition: {
      calories: 350 + i * 5,
      protein: `${20 + (i % 10)}g`,
      carbs: `${30 + (i % 15)}g`,
      fat: `${10 + (i % 10)}g`,
      fiber: `${5 + (i % 5)}g`,
    },
  };
});
