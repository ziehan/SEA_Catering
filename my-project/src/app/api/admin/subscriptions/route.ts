import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    await dbConnect();

    const subscriptions = await Subscription.aggregate([
      {
        $sort: { subscriptionDate: -1 },
      },
      {
        $lookup: {
          from: "users",
          localField: "userEmail",
          foreignField: "email",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          _id: 1,
          planName: 1,
          totalPrice: 1,
          status: 1,
          subscriptionDate: 1,
          "userDetails.fullName": 1,
          "userDetails.email": 1,
        },
      },
    ]);

    return NextResponse.json(subscriptions);
  } catch (error) {
    console.error("Fetch All Subscriptions Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
