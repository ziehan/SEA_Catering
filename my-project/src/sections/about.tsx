import Image from "next/image";

import cateringImage from "@/assets/image/catering.jpg";
import deliveryImage from "@/assets/image/delivery.jpg";
import nutritionImage from "@/assets/image/nutrition.jpg";
import ingredientsImage from "@/assets/image/ingredients.jpg";

const features = [
  {
    title: "Customizable Catering",
    description:
      "Choose from our wide range of healthy menus or create your own meal plan to suit your taste, calorie needs and dietary preferences. Full flexibility for you.",
    image: cateringImage,
    alt: "A variety of healthy catering foods served on the table.",
  },
  {
    title: "Nationwide Delivery",
    description:
      "We cover all major cities in Indonesia. Order from anywhere and we will make sure your healthy food arrives on time at your doorstep, fresh and ready to eat.",
    image: deliveryImage,
    alt: "Couriers ride motorbikes to deliver food packages.",
  },
  {
    title: "Detailed Nutrition Info",
    description:
      "Each dish comes with complete and transparent nutritional information. Know the amount of calories, protein, fat, and carbohydrates to support your health goals.",
    image: nutritionImage,
    alt: "A serving of healthy food with a nutritional information label next to it.",
  },
  {
    title: "Fresh & Quality Ingredients",
    description:
      "We use only selected fresh ingredients from trusted local suppliers. Without preservatives, every bite is a guarantee of the best quality and taste.",
    image: ingredientsImage,
    alt: "A variety of vegetables and fresh ingredients on a cutting board.",
  },
];

export const About = () => {
  return (
    <section className="bg-white text-black py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif">Why SEA Catering?</h2>
          <p className="max-w-xl mx-auto mt-4 text-black/70">
            We are more than just catering. We are your partner in achieving a
            healthier lifestyle that is easier and more enjoyable.
          </p>
        </div>

        <div className="space-y-12 md:space-y-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center"
            >
              <div
                className={`w-full ${
                  index % 2 === 0 ? "md:order-1" : "md:order-2"
                }`}
              >
                <div className="relative w-full h-64 md:h-72">
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    fill
                    className="rounded-lg shadow-lg object-cover"
                  />
                </div>
              </div>

              <div
                className={`w-full p-6 md:p-8 rounded-lg ${
                  index % 2 === 0
                    ? "bg-rose-400/30 md:order-2"
                    : "bg-green-400/30 md:order-1"
                }`}
              >
                <h3 className="text-xl md:text-2xl font-serif mb-3">
                  {feature.title}
                </h3>
                <p className="text-black/75 text-sm md:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center mt-10 gap-4">
        <a href="#">
          <button className="inline-flex items-center gap-2 border border-black/20 bg-black/10 px-6 h-12 rounded-xl text-black hover hover:bg-black/30 transition ease-in-out duration-300">
            <span className="font-semibold">See Menu</span>
          </button>
        </a>
        <a href="#">
          <button className="inline-flex items-center gap-2 border border-black bg-black text-white h-12 px-6 rounded-xl hover hover:bg-black/80 transition ease-in-out duration-300">
            <span className="font-semibold">Subscribe Now</span>
          </button>
        </a>
      </div>
    </section>
  );
};
