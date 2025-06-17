"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  "Often order for family events and everyone loves it. The portions are just right and filling.",
  "Customer service is very responsive and helpful when there are special requests.",
  "The quality of the ingredients feels premium. Totally worth the price.",
  "Makes healthy living easier and more enjoyable. A loyal customer!",
];

export const Testimoni = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const STEP = 2;
  const CARDS_PER_PAGE_DESKTOP = 4;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=10");
        if (!response.ok) throw new Error("Failed to fetch data from server");
        const data = await response.json();
        const combined = data.results.map((user: any, index: number) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          location: `${user.location.city}, ${user.location.country}`,
          picture: user.picture.large,
          message: reviewMessages[index % reviewMessages.length],
        }));
        setReviews(combined);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const maxPage =
    reviews.length > CARDS_PER_PAGE_DESKTOP
      ? Math.ceil((reviews.length - CARDS_PER_PAGE_DESKTOP) / STEP)
      : 0;

  const handlePrev = () => setPage((p) => Math.max(0, p - 1));
  const handleNext = () => setPage((p) => Math.min(maxPage, p + 1));

  const xOffset = `-${page * (100 / (CARDS_PER_PAGE_DESKTOP / STEP))}%`;

  if (isLoading) return <div className="py-20 text-center">Loading...</div>;
  if (error)
    return <div className="py-20 text-center text-red-500">{error}</div>;

  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 mx-auto">
        <div className="mb-12 text-center md:mb-16">
          <motion.h2
            className="text-4xl font-serif md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            What Our Customers Say
          </motion.h2>

          <motion.p
            className="max-w-xl mx-auto mt-4 text-xl leading-relaxed text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            Hear from our loyal customers who have experienced the benefits of
            SEA Catering.
          </motion.p>
        </div>

        <div className="relative flex items-center justify-center">
          <button
            onClick={handlePrev}
            disabled={page === 0}
            className="absolute z-10 p-3 transition-opacity bg-white border border-gray-300 rounded-full shadow-md -left-4 md:left-0 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="w-full max-w-6xl overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: xOffset }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center flex-shrink-0 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    boxShadow: "0px 15px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Image
                    src={review.picture}
                    alt={review.name}
                    width={80}
                    height={80}
                    className="mb-4 border-2 rounded-full border-green-200"
                  />
                  <h3 className="text-2xl font-serif mb-1">{review.name}</h3>
                  <p className="mb-4 text-sm text-gray-500">
                    {review.location}
                  </p>
                  <p className="text-base leading-relaxed text-gray-600">
                    "{review.message}"
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <button
            onClick={handleNext}
            disabled={page === maxPage}
            className="absolute z-10 p-3 transition-opacity bg-white border border-gray-300 rounded-full shadow-md -right-4 md:right-0 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next testimonials"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};
