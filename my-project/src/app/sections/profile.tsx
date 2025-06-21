"use client";

import React, { useState } from "react";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  CheckCircle,
  Utensils,
  AlertTriangle,
  PauseCircle,
  PlayCircle,
  Loader2,
  Save,
  User,
  Calendar,
  CreditCard,
  Settings,
  X,
} from "lucide-react";

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
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center justify-center w-20 h-20 bg-rose-100 rounded-full mb-6"
              >
                <AlertTriangle className="w-10 h-10 text-rose-500" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold font-serif text-gray-800 mb-3"
              >
                Cancel Subscription?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 leading-relaxed"
              >
                This will permanently cancel your subscription and you&apos;ll
                lose access to all scheduled meals. This action cannot be
                undone.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 mt-8"
            >
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 font-semibold text-gray-700 transition-all duration-200 hover:scale-105"
              >
                Keep Subscription
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className="flex-1 py-3 px-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    Cancelling...
                  </>
                ) : (
                  "Yes, Cancel"
                )}
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const LoadingButton = ({
  isLoading,
  children,
  className,
  ...props
}: {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <motion.button
    className={`relative overflow-hidden ${className}`}
    whileHover={{ scale: isLoading ? 1 : 1.02 }}
    whileTap={{ scale: isLoading ? 1 : 0.98 }}
    {...props}
  >
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center"
        >
          <Loader2 className="animate-spin w-5 h-5" />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
);

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    active: {
      color: "bg-emerald-100 text-emerald-700 border-emerald-200",
      icon: <CheckCircle className="w-4 h-4" />,
      pulse: "animate-pulse",
    },
    paused: {
      color: "bg-amber-100 text-amber-700 border-amber-200",
      icon: <PauseCircle className="w-4 h-4" />,
      pulse: "",
    },
    cancelled: {
      color: "bg-rose-100 text-rose-700 border-rose-200",
      icon: <X className="w-4 h-4" />,
      pulse: "",
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig];

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
      className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-bold rounded-full border ${config.color} ${config.pulse}`}
    >
      {config.icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </motion.div>
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
  session: Session & {
    user?: {
      name?: string | null;
      email?: string | null;
      phoneNumber?: string | null;
    };
  };
  subscription: SubscriptionData;
}

export const ProfileClient: React.FC<ProfileClientProps> = ({
  session,
  subscription,
}) => {
  const router = useRouter();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    fullName: session.user?.name || "",
    phoneNumber: session.user?.phoneNumber || "",
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    toast.loading("Saving profile...", { id: "profile-update" });

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to update profile.");
      }

      toast.success("Profile updated successfully!", { id: "profile-update" });
      router.refresh();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message, {
        id: "profile-update",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePause = async (
    subscriptionId: string,
    newStatus: "active" | "paused"
  ) => {
    setIsLoading(true);
    const toastId = `toggle-${newStatus}`;
    toast.loading(`Updating to ${newStatus}...`, { id: toastId });

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

      toast.success(`Subscription ${newStatus} successfully.`, { id: toastId });
      router.refresh();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSubscription = async (subscriptionId: string) => {
    setIsLoading(true);

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
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    } finally {
      setIsLoading(false);
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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-gray-100 py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-rose-100 rounded-full mb-6"
            >
              <User className="w-10 h-10 text-rose-600" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold font-serif title-page mb-4 pb-1">
              My Profile
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Manage your personal information and subscription details with
              ease.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Settings className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Personal Information
                  </h2>
                </div>

                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={userInfo.fullName}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, fullName: e.target.value })
                      }
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                      placeholder="Enter your full name"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={session.user?.email || ""}
                      disabled
                      className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed text-gray-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Email cannot be changed for security reasons
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={userInfo.phoneNumber}
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
                          phoneNumber: e.target.value,
                        })
                      }
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                      placeholder="e.g., 081234567890"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pt-6 border-t border-gray-100"
                  >
                    <LoadingButton
                      type="submit"
                      isLoading={isLoading}
                      className="w-full py-4 px-6 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all duration-200"
                      disabled={isLoading}
                    >
                      <Save className="w-5 h-5 mr-2" />
                      Save Profile
                    </LoadingButton>
                  </motion.div>
                </form>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 h-fit">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <CreditCard className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Subscription
                    </h2>
                  </div>
                  {subscription && <StatusBadge status={subscription.status} />}
                </div>

                {subscription && subscription.status !== "cancelled" ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="p-6 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl border border-emerald-100">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            Current Plan
                          </p>
                          <p className="text-xl font-bold text-emerald-600">
                            {subscription.planName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            Monthly Price
                          </p>
                          <p className="text-lg font-semibold text-gray-800">
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            }).format(subscription.totalPrice)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-5 h-5 text-gray-600" />
                        <p className="font-semibold text-gray-800">
                          Upcoming Meals
                        </p>
                      </div>

                      {subscription.status === "paused" ? (
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-center p-6 bg-amber-50 rounded-2xl border border-amber-200"
                        >
                          <PauseCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                          <p className="font-semibold text-amber-800 mb-1">
                            Subscription Paused
                          </p>
                          <p className="text-sm text-amber-600">
                            Your meals are on hold. Resume anytime to continue
                            deliveries.
                          </p>
                        </motion.div>
                      ) : (
                        <div className="space-y-4">
                          {upcomingSchedule.length > 0 ? (
                            upcomingSchedule.map((day, dayIndex) => (
                              <motion.div
                                key={dayIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: dayIndex * 0.1 }}
                                className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all duration-200"
                              >
                                <p className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(day.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      weekday: "long",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}
                                </p>
                                <div className="space-y-3 pl-6 border-l-2 border-emerald-200">
                                  {day.meals.map((meal, mealIndex) => (
                                    <motion.div
                                      key={mealIndex}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{
                                        delay:
                                          dayIndex * 0.1 + mealIndex * 0.05,
                                      }}
                                      className="flex items-start gap-3"
                                    >
                                      {day.status === "completed" ? (
                                        <CheckCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                                      ) : (
                                        <Utensils className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                                      )}
                                      <div className="flex-grow">
                                        <p
                                          className={`font-semibold ${
                                            day.status === "completed"
                                              ? "text-gray-500 line-through"
                                              : "text-gray-800"
                                          }`}
                                        >
                                          {meal.mealTitle}
                                          <span className="font-normal text-gray-500 text-sm ml-2">
                                            ({meal.mealType})
                                          </span>
                                        </p>
                                        <p
                                          className={`text-sm ${
                                            day.status === "completed"
                                              ? "text-gray-400"
                                              : "text-gray-600"
                                          }`}
                                        >
                                          {meal.mealDescription}
                                        </p>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            ))
                          ) : (
                            <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
                              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                              <p className="text-gray-500">
                                No upcoming meals scheduled.
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex flex-col gap-3 pt-6 border-t border-gray-100"
                    >
                      <div className="flex gap-3">
                        {subscription.status === "active" ? (
                          <LoadingButton
                            onClick={() =>
                              handleTogglePause(subscription._id, "paused")
                            }
                            isLoading={isLoading}
                            className="flex-1 py-3 px-4 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600 transition-all duration-200"
                            disabled={isLoading}
                          >
                            <PauseCircle className="w-5 h-5 mr-2" />
                            Pause
                          </LoadingButton>
                        ) : (
                          <LoadingButton
                            onClick={() =>
                              handleTogglePause(subscription._id, "active")
                            }
                            isLoading={isLoading}
                            className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-all duration-200"
                            disabled={isLoading}
                          >
                            <PlayCircle className="w-5 h-5 mr-2" />
                            Resume
                          </LoadingButton>
                        )}

                        <Link
                          href={`/auth/subscription/edit/${subscription._id}`}
                          className="flex-1 text-center py-3 px-4 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-200 hover:scale-105"
                        >
                          Edit Schedule
                        </Link>
                      </div>

                      <button
                        onClick={() => setIsCancelModalOpen(true)}
                        disabled={isLoading}
                        className="w-full py-3 px-4 rounded-xl bg-rose-500 text-white font-semibold hover:bg-rose-600 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                      >
                        Cancel Subscription
                      </button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                      <CreditCard className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      {subscription?.status === "cancelled"
                        ? "Subscription Cancelled"
                        : "No Active Subscription"}
                    </h3>
                    <p className="text-gray-500 mb-6">
                      {subscription?.status === "cancelled"
                        ? "Your subscription has been cancelled. You can start a new one anytime."
                        : "Start your meal journey with one of our subscription plans."}
                    </p>
                    <Link
                      href="/subscription"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:scale-105"
                    >
                      Choose a Plan
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <CancelModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={() =>
          subscription && handleCancelSubscription(subscription._id)
        }
        isLoading={isLoading}
      />
    </>
  );
};
