"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  HelpCircle,
  Building2,
  MessageSquare,
  User,
  Mail,
  Phone,
} from "lucide-react";

const contactPoints = [
  {
    icon: HelpCircle,
    title: "Ask About Plans",
    description:
      "Not sure which plan is right for you? Our nutrition advisors are ready to provide personalized recommendations based on your goals.",
    color: "blue",
  },
  {
    icon: Building2,
    title: "Corporate & Events",
    description:
      "Planning a corporate event or a special occasion? Contact us for a custom catering quote that will impress your guests.",
    color: "emerald",
  },
  {
    icon: MessageSquare,
    title: "Feedback & Suggestions",
    description:
      "Have ideas on how we can improve? We highly value your feedback to continue providing the best service.",
    color: "rose",
  },
];

const colorStyles = {
  blue: { text: "text-blue-600", bg: "bg-blue-100" },
  emerald: { text: "text-emerald-600", bg: "bg-emerald-100" },
  rose: { text: "text-rose-600", bg: "bg-rose-100" },
};

export const Contact = () => {
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRedirectUrl(`${window.location.origin}/contact/success`);
    }
  }, []);

  return (
    <section className="min-h-screen w-full py-20 px-4 sm:px-6 lg:px-8 mt-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-serif title-page">
            Get In Touch
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We're here to help and answer any question you might have. We look
            forward to hearing from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {contactPoints.map((point, index) => {
              const Icon = point.icon;
              const styles =
                colorStyles[point.color as keyof typeof colorStyles];
              return (
                <div key={index} className="flex items-start gap-5">
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${styles.bg}`}
                  >
                    <Icon className={`w-8 h-8 ${styles.text}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {point.title}
                    </h3>
                    <p className="mt-1 text-gray-600 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          <motion.div
            className="bg-gray-100/50 backdrop-blur-2xl p-8 rounded-2xl shadow-lg border border-gray-100"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send Us a Message
            </h2>
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="space-y-6"
              onSubmit={() => {
                sessionStorage.setItem("contactFormSubmitted", "true");
              }}
            >
              <input
                type="hidden"
                name="access_key"
                value="29b2277f-9681-45b4-a0fe-7543873a06b3"
              />

              <input type="hidden" name="redirect" value={redirectUrl} />

              <input
                type="hidden"
                name="subject"
                value="New Contact Message from SEA Catering Website"
              />

              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="form"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-70"
                >
                  Email Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="form "
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="form"
                    placeholder="(+62) 812-3456-7890"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    name="message"
                    id="message"
                    required
                    rows={4}
                    className="block w-full rounded-lg bg-white border-gray-300 py-3 px-4 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
              </div>

              <div>
                <motion.button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-rose-500 hover:bg-green-500"
                  whileHover={{
                    scale: 1.01,
                    transition: {
                      type: "tween",
                      duration: 0.2,
                      ease: "easeInOut",
                    },
                  }}
                  whileTap={{
                    scale: 0.98,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                    },
                  }}
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
