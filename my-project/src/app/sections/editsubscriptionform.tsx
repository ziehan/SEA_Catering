"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Save, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

type MealSelection = {
  mealType: string;
  mealId: number;
  mealTitle: string;
  mealDescription: string;
};
type DailySchedule = { date: string; meals: MealSelection[] };
type Subscription = {
  _id: string;
  planName: string;
  schedule: DailySchedule[];
};
type MealOption = { id: number; title: string; description: string };
interface EditFormProps {
  initialSubscription: Subscription;
  availableMeals: MealOption[];
}

export const EditSubscriptionForm: React.FC<EditFormProps> = ({
  initialSubscription,
  availableMeals,
}) => {
  const router = useRouter();
  const [schedule, setSchedule] = useState(initialSubscription.schedule);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMealChange = (
    dateToUpdate: string,
    mealTypeToUpdate: string,
    selectedMealId: string
  ) => {
    const selectedMeal = availableMeals.find(
      (m) => m.id === parseInt(selectedMealId)
    );
    if (!selectedMeal) return;

    setSchedule((currentSchedule) =>
      currentSchedule.map((day) => {
        if (day.date === dateToUpdate) {
          const updatedMeals = day.meals.map((meal) =>
            meal.mealType === mealTypeToUpdate
              ? {
                  ...meal,
                  mealId: selectedMeal.id,
                  mealTitle: selectedMeal.title,
                  mealDescription: selectedMeal.description,
                }
              : meal
          );
          return { ...day, meals: updatedMeals };
        }
        return day;
      })
    );
  };

  const handleSaveChanges = async () => {
    setIsSubmitting(true);
    toast.loading("Saving changes...");
    try {
      const response = await fetch(
        `/api/subscriptions/${initialSubscription._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ schedule: schedule }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to update.");
      }
      toast.dismiss();
      toast.success("Schedule updated successfully!");
      router.push("/auth/profile");
      router.refresh();
    } catch (err: any) {
      toast.dismiss();
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-20 px-4 mt-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-serif title-page">
            Edit Your Schedule
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Customize your daily meals for the{" "}
            <span className="font-bold text-emerald-600">
              {initialSubscription.planName}
            </span>
            .
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
          <div className="space-y-6">
            {schedule
              .filter(
                (day) =>
                  new Date(day.date) >=
                  new Date(new Date().setHours(0, 0, 0, 0))
              )
              .map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className="p-4 rounded-lg bg-gray-50 border"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span className="font-semibold text-gray-700">
                      {new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                  <div className="space-y-3 pl-8">
                    {day.meals.map((meal, mealIndex) => (
                      <div
                        key={mealIndex}
                        className="grid grid-cols-3 items-center gap-2"
                      >
                        <label className="font-medium text-gray-600">
                          {meal.mealType}:
                        </label>
                        <select
                          value={meal.mealId}
                          onChange={(e) =>
                            handleMealChange(
                              day.date,
                              meal.mealType,
                              e.target.value
                            )
                          }
                          className="w-full col-span-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        >
                          {availableMeals.map((mealOption) => (
                            <option key={mealOption.id} value={mealOption.id}>
                              {mealOption.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
          <div className="pt-6 border-t">
            <motion.button
              onClick={handleSaveChanges}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center py-3 px-6 rounded-xl font-bold text-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" /> Save Changes
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};
