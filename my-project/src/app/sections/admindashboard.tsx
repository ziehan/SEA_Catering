"use client";

import React, { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Briefcase,
  DollarSign,
  UserPlus,
  MoreVertical,
  Edit,
  Trash2,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const StatCard = ({
  title,
  value,
  icon,
  formatAsCurrency = false,
}: {
  title: string;
  value: any;
  icon: React.ElementType;
  formatAsCurrency?: boolean;
}) => {
  const Icon = icon;
  const formattedValue =
    typeof value !== "number" ? (
      <div className="h-8 bg-gray-200 rounded-md w-24 animate-pulse"></div>
    ) : formatAsCurrency ? (
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(value)
    ) : (
      new Intl.NumberFormat("id-ID").format(value)
    );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center gap-6 border border-gray-100">
      <div className="bg-emerald-100 p-4 rounded-full">
        <Icon className="w-8 h-8 text-emerald-600" />
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <div className="text-3xl font-bold text-gray-800">{formattedValue}</div>
      </div>
    </div>
  );
};

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
            This action is permanent and will set the user's subscription status
            to 'cancelled'.
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

export const AdminDashboardClient = () => {
  const router = useRouter();
  const [stats, setStats] = useState<any>({});
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, subsRes] = await Promise.all([
        fetch(`/api/admin/dashboard-stats`, { credentials: "include" }),
        fetch(`/api/admin/subscriptions`, { credentials: "include" }),
      ]);

      if (!statsRes.ok || !subsRes.ok) {
        const errorData = statsRes.ok
          ? await subsRes.json()
          : await statsRes.json();
        throw new Error(errorData.message || "Failed to fetch data.");
      }

      const statsData = await statsRes.json();
      const subsData = await subsRes.json();

      setStats(statsData);
      setSubscriptions(subsData);
    } catch (error: any) {
      console.error("Failed to fetch dashboard data", error);
      toast.error(error.message || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCancelClick = (id: string) => {
    setSelectedSubId(id);
    setIsModalOpen(true);
  };
  const confirmCancel = async () => {
    if (!selectedSubId) return;
    setIsProcessing(true);
    try {
      await fetch(`/api/subscriptions/${selectedSubId}`, {
        method: "DELETE",
        credentials: "include",
      });
      toast.success("Subscription cancelled.");
      fetchData();
    } catch (error) {
      toast.error("Failed to cancel subscription.");
    } finally {
      setIsProcessing(false);
      setIsModalOpen(false);
      setSelectedSubId(null);
    }
  };
  const chartData = [
    {
      name: "Subscriptions",
      New: stats.newSubscriptions || 0,
      Active: stats.totalActiveSubscriptions || 0,
    },
  ];

  return (
    <>
      <section className="min-h-screen bg-gray-100 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold font-serif title-page mb-8">
            Admin Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="New Subscriptions"
              value={stats.newSubscriptions}
              icon={UserPlus}
            />
            <StatCard
              title="Total Active Subscriptions"
              value={stats.totalActiveSubscriptions}
              icon={Briefcase}
            />
            <StatCard
              title="Monthly Recurring Revenue"
              value={stats.mrr}
              icon={DollarSign}
              formatAsCurrency
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
              <h2 className="font-bold text-xl mb-4">All User Subscriptions</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font--medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td colSpan={4} className="text-center py-10">
                          <Loader2 className="animate-spin mx-auto text-gray-400 w-8 h-8" />
                        </td>
                      </tr>
                    ) : (
                      subscriptions.map((sub) => (
                        <tr key={sub._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {sub.userDetails.fullName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {sub.userDetails.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {sub.planName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${sub.status === "active" ? "emerald" : sub.status === "paused" ? "amber" : "rose"}-100 text-${sub.status === "active" ? "emerald" : sub.status === "paused" ? "amber" : "rose"}-800`}
                            >
                              {sub.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              href={`/auth/subscription/edit/${sub._id}`}
                              className="text-indigo-600 hover:text-indigo-900 mr-4"
                              title="Edit Schedule"
                            >
                              <Edit className="inline w-5 h-5" />
                            </Link>
                            {sub.status !== "cancelled" && (
                              <button
                                onClick={() => handleCancelClick(sub._id)}
                                className="text-rose-600 hover:text-rose-900"
                                title="Cancel Subscription"
                              >
                                <Trash2 className="inline w-5 h-5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg h-fit">
              <h2 className="font-bold text-xl mb-4">Overview Chart</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) =>
                        new Intl.NumberFormat("id-ID").format(value)
                      }
                    />
                    <Legend />
                    <Bar dataKey="New" fill="#10b981" />
                    <Bar dataKey="Active" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AnimatePresence>
        <CancelModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmCancel}
          isLoading={isProcessing}
        />
      </AnimatePresence>
    </>
  );
};
