import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function DELETE(request: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  const { id } = params;

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const subscription = await Subscription.findById(id);

    if (!subscription || subscription.userEmail !== session.user.email) {
      return NextResponse.json(
        { message: "Forbidden or Not Found" },
        { status: 403 }
      );
    }

    await Subscription.findByIdAndUpdate(id, { status: "cancelled" });

    return NextResponse.json(
      { message: "Subscription cancelled successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  const { id } = params;
  const { status } = await request.json();

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!["active", "paused"].includes(status)) {
    return NextResponse.json(
      { message: "Invalid status update" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const subscription = await Subscription.findById(id);

    if (!subscription || subscription.userEmail !== session.user.email) {
      return NextResponse.json(
        { message: "Forbidden or Not Found" },
        { status: 403 }
      );
    }

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    return NextResponse.json(
      { success: true, data: updatedSubscription },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
