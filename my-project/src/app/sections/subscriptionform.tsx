"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, AlertCircle, Check } from "lucide-react";
import { MENU_DATA } from "@/lib/menu-data";

type Plan = { name: string; price: number };
type FormStatus = "idle" | "submitting" | "success" | "error";

const planOptions: Plan[] = [
  { name: "Diet Plan", price: 30000 },
  { name: "Protein Plan", price: 40000 },
  { name: "Royal Plan", price: 60000 },
];
const mealTypeOptions = ["Breakfast", "Lunch", "Dinner"];
const deliveryDayOptions = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const SubscriptionForm = () => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    allergies: "",
  });
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([]);
  const [selectedDeliveryDays, setSelectedDeliveryDays] = useState<string[]>(
    []
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const planNameFromUrl = searchParams.get("plan");
    if (planNameFromUrl) {
      const planToSelect = planOptions.find((p) => p.name === planNameFromUrl);
      if (planToSelect) setSelectedPlan(planToSelect);
    }
  }, [searchParams]);

  useEffect(() => {
    if (
      selectedPlan &&
      selectedMealTypes.length > 0 &&
      selectedDeliveryDays.length > 0
    ) {
      const price =
        selectedPlan.price *
        selectedMealTypes.length *
        selectedDeliveryDays.length *
        4.3;
      setTotalPrice(price);
    } else {
      setTotalPrice(0);
    }
  }, [selectedPlan, selectedMealTypes, selectedDeliveryDays]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const { value, checked } = e.target;
    setter((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setIsLoading(true);
    setErrorMessage("");

    const schedule = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      const dayName = deliveryDayOptions[futureDate.getDay()];

      if (selectedDeliveryDays.includes(dayName)) {
        const mealsForDay = [];
        for (const mealType of selectedMealTypes) {
          const defaultMeal = MENU_DATA.find(
            (menu) => menu.planType === selectedPlan?.name
          );

          if (defaultMeal) {
            mealsForDay.push({
              mealType: mealType,
              mealId: defaultMeal.id,
              mealTitle: defaultMeal.title,
              mealDescription: defaultMeal.description,
            });
          }
        }

        if (mealsForDay.length > 0) {
          schedule.push({
            date: futureDate,
            meals: mealsForDay,
            status: "active",
          });
        }
      }
    }

    const submissionData = {
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      planName: selectedPlan?.name,
      allergies: formData.allergies,
      totalPrice: totalPrice,
      schedule: schedule,
      status: "active",
    };

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
        credentials: "include",
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to submit subscription.");
      }
      setFormStatus("success");
    } catch (error: unknown) {
      setFormStatus("error");
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (formStatus === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[70vh]">
        <motion.div
          className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-gray-100 text-center max-w-lg w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <Check className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold font-serif text-gray-800">
            Subscription Successful!
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Thank you for subscribing! We will contact you shortly.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="py-20 px-4 mt-4 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold font-serif title-page pb-1">
            Create Your Subscription
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Customize your healthy meal plan just the way you like it.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl space-y-8"
        >
          {/* ... sisa form tidak berubah ... */}
          <div>
            <h3 className="text-xl font-bold mb-4">1. Your Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Full Name *"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Active Phone Number *"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">2. Select Your Plan *</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {planOptions.map((plan) => (
                <label
                  key={plan.name}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedPlan?.name === plan.name
                      ? "border-emerald-500 ring-2 ring-emerald-300"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    value={plan.name}
                    checked={selectedPlan?.name === plan.name}
                    onChange={() => setSelectedPlan(plan)}
                    className="hidden"
                    required
                  />
                  <span className="font-bold block">{plan.name}</span>
                  <span className="text-sm text-gray-600">
                    {new Intl.NumberFormat("id-ID").format(plan.price)}/meal
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">3. Meal Types *</h3>
              <div className="space-y-2">
                {mealTypeOptions.map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={type}
                      onChange={(e) =>
                        handleCheckboxChange(e, setSelectedMealTypes)
                      }
                      className="h-5 w-5 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">4. Delivery Days *</h3>
              <div className="grid grid-cols-2 gap-2">
                {deliveryDayOptions.map((day) => (
                  <label
                    key={day}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={day}
                      onChange={(e) =>
                        handleCheckboxChange(e, setSelectedDeliveryDays)
                      }
                      className="h-5 w-5 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>{day}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">5. Allergies (Optional)</h3>
            <textarea
              name="allergies"
              value={formData.allergies}
              onChange={handleInputChange}
              placeholder="e.g., peanuts, seafood"
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            ></textarea>
          </div>
          <div className="bg-emerald-50 p-6 rounded-lg text-center">
            <p className="text-lg text-emerald-800">Estimated Monthly Price</p>
            <p className="text-3xl sm:text-4xl font-bold text-emerald-600 font-serif mt-2 break-words">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(totalPrice)}
            </p>
          </div>
          <motion.button
            type="submit"
            disabled={formStatus === "submitting" || isLoading}
            className="w-full flex items-center justify-center py-4 px-6 rounded-xl font-bold text-lg text-white bg-green-500 hover:bg-green-600 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {formStatus === "submitting" ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Subscribe Now"
            )}
          </motion.button>
          {formStatus === "error" && (
            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle />
              <p>{errorMessage}</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
