import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";
import { MENU_DATA } from "@/lib/menu-data";

import { Header } from "@/app/sections/header";
import { Footer } from "@/app/sections/footer";
import { EditSubscriptionForm } from "@/app/auth/subscription/edit/[id]/sections/editsubscriptionform";

interface EditPageProps {
  params: {
    id: string;
  };
}

async function getDataForEdit(subscriptionId: string, userEmail: string) {
  try {
    await dbConnect();

    const subscription = await Subscription.findById(subscriptionId).lean();

    if (!subscription || subscription.userEmail !== userEmail) {
      return { subscription: null, allMeals: [] };
    }

    const allMeals = MENU_DATA.map((meal) => ({
      id: meal.id,
      title: meal.title,
      planType: meal.planType,
    }));

    return {
      subscription: JSON.parse(JSON.stringify(subscription)),
      allMeals: allMeals,
    };
  } catch (error) {
    console.error("Failed to fetch data for edit page:", error);
    return { subscription: null, allMeals: [] };
  }
}

export default async function EditSubscriptionPage({ params }: EditPageProps) {
  const session = await getServerSession(authOptions);
  const { id } = params;

  if (!session || !session.user?.email) {
    redirect("/auth/login");
  }

  const { subscription, allMeals } = await getDataForEdit(
    id,
    session.user.email
  );

  if (!subscription) {
    redirect("/auth/profile");
  }

  const relevantMeals = allMeals.filter(
    (meal) => meal.planType === subscription.planName
  );

  return (
    <main>
      <Header />
      <EditSubscriptionForm
        initialSubscription={subscription}
        availableMeals={relevantMeals}
      />
      <Footer />
    </main>
  );
}
