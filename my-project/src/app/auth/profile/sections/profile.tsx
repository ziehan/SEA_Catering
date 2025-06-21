"use client";

import React, { useState } from "react";
import { Session } from "next-auth";
import Link from "next/link";
import {
  CheckCircle,
  Utensils,
  AlertTriangle,
  PauseCircle,
  PlayCircle,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const CancelModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl"
      >
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold font-serif">
            Cancel Subscription?
          </h2>
          <p className="text-gray-600 mt-2">
            This will set your subscription status to 'cancelled' and cannot be
            undone. Are you sure?
          </p>
        </div>
        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold"
          >
            Go Back
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-2 px-4 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
            {isLoading ? "Cancelling..." : "Yes, Cancel"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

type MealSelection = {
  mealType: string;
  mealId: number;
  mealTitle: string;
  mealDescription: string;
};
type DailySchedule = {
  date: string;
  meals: MealSelection[];
  status: "active" | "completed" | "paused" | "cancelled";
};
type SubscriptionData = {
  _id: string;
  planName: string;
  totalPrice: number;
  schedule: DailySchedule[];
  status: "active" | "paused" | "cancelled";
} | null;
interface ProfileClientProps {
  session: Session;
  subscription: SubscriptionData;
}

export const ProfileClient: React.FC<ProfileClientProps> = ({
  session,
  subscription,
}) => {
  const router = useRouter();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTogglePause = async (
    subscriptionId: string,
    newStatus: "active" | "paused"
  ) => {
    setIsProcessing(true);
    toast.loading(`Updating to ${newStatus}...`);
    try {
      const res = await fetch(`/api/subscriptions/${subscriptionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update status.");
      }
      toast.dismiss();
      toast.success(`Subscription ${newStatus} successfully.`);
      router.refresh();
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelSubscription = async (subscriptionId: string) => {
    setIsProcessing(true);
    try {
      const res = await fetch(`/api/subscriptions/${subscriptionId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to cancel.");
      }
      toast.success("Subscription cancelled successfully.");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
      setIsCancelModalOpen(false);
    }
  };

  const upcomingSchedule = subscription?.schedule
    ? subscription.schedule
        .filter(
          (day) =>
            new Date(day.date) >=
            new Date(new Date().setDate(new Date().getDate() - 1))
        )
        .slice(0, 5)
    : [];

  const statusStyles = {
    active: { text: "text-emerald-700", bg: "bg-emerald-100" },
    paused: { text: "text-amber-700", bg: "bg-amber-100" },
    cancelled: { text: "text-rose-700", bg: "bg-rose-100" },
  };

  return (
    <>
      <section className="min-h-screen bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-800">
              My Profile
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Manage your personal information and subscription details.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg h-fit">
              <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {session.user?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Email Address
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {session.user?.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">Your Subscription</h2>
                {subscription && (
                  <div
                    className={`px-3 py-1 text-sm font-bold rounded-full ${statusStyles[subscription.status]?.bg} ${statusStyles[subscription.status]?.text}`}
                  >
                    {subscription.status.charAt(0).toUpperCase() +
                      subscription.status.slice(1)}
                  </div>
                )}
              </div>
              {subscription && subscription.status !== "cancelled" ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Current Plan
                    </p>
                    <p className="text-lg font-bold text-emerald-600">
                      {subscription.planName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Monthly Price
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(subscription.totalPrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mt-4">
                      Upcoming Meals
                    </p>
                    {subscription.status === "paused" ? (
                      <div className="text-center p-6 bg-amber-50 rounded-lg mt-2">
                        <p className="font-semibold text-amber-800">
                          Your subscription is paused. Meals will not be
                          delivered.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3 mt-2">
                        {upcomingSchedule.length > 0 ? (
                          upcomingSchedule.map((day, dayIndex) => (
                            <div
                              key={dayIndex}
                              className="p-3 rounded-lg bg-gray-50 border"
                            >
                              <p className="font-semibold text-gray-600 mb-2">
                                {new Date(day.date).toLocaleDateString(
                                  "en-US",
                                  { weekday: "long", day: "numeric" }
                                )}
                              </p>
                              <div className="space-y-2 pl-4 border-l-2">
                                {day.meals.map((meal, mealIndex) => (
                                  <div
                                    key={mealIndex}
                                    className={`flex items-start gap-3`}
                                  >
                                    {day.status === "completed" ? (
                                      <CheckCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                                    ) : (
                                      <Utensils className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                                    )}
                                    <div className="flex-grow">
                                      <p
                                        className={`font-semibold ${day.status === "completed" ? "text-gray-500 line-through" : "text-gray-800"}`}
                                      >
                                        {meal.mealTitle}{" "}
                                        <span className="font-normal text-gray-500">
                                          ({meal.mealType})
                                        </span>
                                      </p>
                                      <p
                                        className={`text-sm ${day.status === "completed" ? "text-gray-400" : "text-gray-600"}`}
                                      >
                                        {meal.mealDescription}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500 p-4 bg-gray-50 rounded-lg">
                            No upcoming meals scheduled.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-6 border-t">
                    {subscription.status === "active" ? (
                      <button
                        onClick={() =>
                          handleTogglePause(subscription._id, "paused")
                        }
                        disabled={isProcessing}
                        className="flex-1 flex items-center justify-center py-2 px-4 rounded-lg bg-amber-500 text-white font-semibold hover:bg-amber-600 transition-colors"
                      >
                        <PauseCircle className="w-5 h-5 mr-2" /> Pause
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleTogglePause(subscription._id, "active")
                        }
                        disabled={isProcessing}
                        className="flex-1 flex items-center justify-center py-2 px-4 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
                      >
                        <PlayCircle className="w-5 h-5 mr-2" /> Resume
                      </button>
                    )}
                    <Link
                      href={`/auth/subscription/edit/${subscription._id}`}
                      className="flex-1 text-center py-2 px-4 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
                    >
                      Edit Schedule
                    </Link>
                    <button
                      onClick={() => setIsCancelModalOpen(true)}
                      disabled={isProcessing}
                      className="flex-1 py-2 px-4 rounded-lg bg-rose-500 text-white font-semibold hover:bg-rose-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">
                    {subscription?.status === "cancelled"
                      ? "Your subscription has been cancelled."
                      : "You don't have an active subscription."}
                  </p>
                  <Link
                    href="/subscription"
                    className="mt-4 inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                  >
                    Choose a Plan
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <AnimatePresence>
        <CancelModal
          isOpen={isCancelModalOpen}
          onClose={() => setIsCancelModalOpen(false)}
          onConfirm={() =>
            subscription && handleCancelSubscription(subscription._id)
          }
          isLoading={isProcessing}
        />
      </AnimatePresence>
    </>
  );
};
