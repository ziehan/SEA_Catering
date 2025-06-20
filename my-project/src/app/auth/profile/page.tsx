import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";

import { Header } from "@/app/sections/header";
import { Footer } from "@/app/sections/footer";
import { ProfileClient } from "@/app/auth/profile/sections/profile";

async function getUserData(email: string) {
  await dbConnect();
  const subscription = await Subscription.findOne({ userEmail: email })
    .sort({ subscriptionDate: -1 })
    .lean();
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
