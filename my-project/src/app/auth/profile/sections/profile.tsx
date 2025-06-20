"use client";

import React from "react";
import { Session } from "next-auth";
import Link from "next/link";

type SubscriptionData = {
  planName: string;
  totalPrice: number;
  deliveryDays: string[];
  subscriptionDate: string;
} | null;

interface ProfileClientProps {
  session: Session;
  subscription: SubscriptionData;
}

export const ProfileClient: React.FC<ProfileClientProps> = ({
  session,
  subscription,
}) => {
  return (
    <section className="min-h-screen bg-gray-50 py-20 px-4 mt-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-serif title-page pb-1">
            My Profile
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Manage your personal information and subscription details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kartu Biodata */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
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

          {/* Kartu Langganan */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Active Subscription</h2>
            {subscription ? (
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
                  <p className="text-sm font-medium text-gray-500">
                    Delivery Days
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {subscription.deliveryDays.map((day) => (
                      <span
                        key={day}
                        className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">
                  You don't have an active subscription.
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
  );
};
