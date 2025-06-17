"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Review = {
  id: string;
  name: string;
  location: string;
  picture: string;
  message: string;
};

const reviewMessages = [
  "The food is always fresh and delicious! It really helps my diet program.",
  "The service is amazing, delivery is always on time. Recommended!",
  "Affordable price for premium quality. My favorite menu for lunch.",
  "The menu choices are varied, so I never get bored. The nutrition is also balanced.",
  "Very practical for those who are busy but still want to eat healthy. Thank you SEA Catering!",
  "The most delicious diet catering I've ever tried! The taste is not bland at all.",
  "Often order for family events and everyone likes it. The portions are just right and filling.",
  "Customer service is very responsive and helpful when there are special requests.",
  "The quality of the ingredients feels premium. Totally worth the price.",
  "Makes healthy living easier and more enjoyable. Loyal customer!",
];

export const Testimoni = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=10");
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server");
        }
        const data = await response.json();

        const combinedReviews = data.results.map(
          (user: any, index: number) => ({
            id: user.login.uuid,
            name: `${user.name.first} ${user.name.last}`,
            location: `${user.location.city}, ${user.location.country}`,
            picture: user.picture.large,
            message: reviewMessages[index],
          })
        );

        setReviews(combinedReviews);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <p>Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 text-black py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-serif">What they say?</h2>
          <p className="max-w-xl mx-auto mt-4 text-black/70">
            Hear from our loyal customers who have felt the benefits of SEA
            Catering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={review.picture}
                alt={review.name}
                width={80}
                height={80}
                className="rounded-full mb-4 border-2 border-green-200"
              />
              <h3 className="font-semibold text-lg">{review.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{review.location}</p>
              <p className="text-gray-700 italic">"{review.message}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
