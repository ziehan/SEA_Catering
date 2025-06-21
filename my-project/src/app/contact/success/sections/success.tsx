"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

const MotionLink = motion(Link);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

export const Success = () => {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const submitted = sessionStorage.getItem("contactFormSubmitted");

    if (submitted === "true") {
      setIsVerified(true);
      sessionStorage.removeItem("contactFormSubmitted");
    } else {
      router.push("/contact");
    }
  }, [router]);

  if (!isVerified) {
    return null;
  }

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-gray-100 text-center max-w-lg w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.5,
            }}
          >
            <CheckCircle className="w-20 h-20 text-emerald-500" />
          </motion.div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold font-serif text-gray-800"
        >
          Message Sent Successfully!
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-4 text-lg text-gray-600"
        >
          Thank you for reaching out. We have received your message and will get
          back to you as soon as possible.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-10">
          <MotionLink
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold text-lg py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </MotionLink>
        </motion.div>
      </motion.div>
    </section>
  );
};
