import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";

import { Header } from "@/app/sections/header";
import { Menu } from "@/app/sections/menu";
import { Footer } from "@/app/sections/footer";

async function getActiveSubscription(userEmail: string | null | undefined) {
  if (!userEmail) {
    return null;
  }

  await dbConnect();
  const subscription = await Subscription.findOne({
    userEmail: userEmail,
    status: "active",
  }).lean();

  return subscription ? JSON.parse(JSON.stringify(subscription)) : null;
}

export default async function MenuPage() {
  const session = await getServerSession(authOptions);
  const activeSubscription = await getActiveSubscription(session?.user?.email);

  return (
    <main>
      <Header />
      {/* Kirim data langganan sebagai prop ke komponen Menu */}
      <Menu activeSubscription={activeSubscription} />
      <Footer />
    </main>
  );
}
