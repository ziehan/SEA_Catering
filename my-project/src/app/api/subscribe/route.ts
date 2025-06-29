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

  if (session.user.role === "admin") {
    return NextResponse.json(
      { success: false, error: "Admins cannot create subscriptions." },
      { status: 403 }
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
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
