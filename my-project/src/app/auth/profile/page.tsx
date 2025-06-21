import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";

import { Header } from "@/app/sections/header";
import { Footer } from "@/app/sections/footer";
import { ProfileClient } from "@/app/sections/profile";

async function getUserData(email: string) {
  await dbConnect();

  let subscription = await Subscription.findOne({
    userEmail: email,
    status: { $in: ["active", "paused"] },
  })
    .sort({ subscriptionDate: -1 })
    .lean();

  if (subscription) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let needsDbUpdate = false;
    const updatedSchedule = subscription.schedule.map((day) => {
      if (new Date(day.date) < today && day.status === "active") {
        needsDbUpdate = true;
        const completedMeals = day.meals.map((meal) => ({
          ...meal,
          status: "completed",
        }));
        return { ...day, meals: completedMeals, status: "completed" };
      }
      return day;
    });

    if (needsDbUpdate) {
      await Subscription.findByIdAndUpdate(subscription._id, {
        schedule: updatedSchedule,
      });
      subscription.schedule = updatedSchedule;
    }
  }

  return {
    subscription: subscription
      ? JSON.parse(JSON.stringify(subscription))
      : null,
  };
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    redirect("/auth/login");
  }

  const { subscription } = await getUserData(session.user.email);

  return (
    <main>
      <Header />
      <ProfileClient session={session} subscription={subscription} />
      <Footer />
    </main>
  );
}
