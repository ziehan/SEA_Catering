import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";
import { NextResponse } from "next/server";

export async function GET(_request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    await dbConnect();

    const newSubscriptions = await Subscription.countDocuments({});

    const totalActiveSubscriptions = await Subscription.countDocuments({
      status: "active",
    });

    const mrrData = await Subscription.aggregate([
      { $match: { status: "active" } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);
    const mrr = mrrData[0]?.total || 0;

    return NextResponse.json({
      newSubscriptions,
      totalActiveSubscriptions,
      mrr,
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
