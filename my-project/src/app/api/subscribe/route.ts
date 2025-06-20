import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json(
      { success: false, error: "Unauthorized: Please log in to subscribe." },
      { status: 401 }
    );
  }

  try {
    await dbConnect();
    const body = await request.json();

    const subscriptionData = {
      ...body,
      userEmail: session.user.email,
    };

    const newSubscription = await Subscription.create(subscriptionData);

    return NextResponse.json(
      { success: true, data: newSubscription },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
