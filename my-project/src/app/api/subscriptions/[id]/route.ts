import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";
import { NextResponse } from "next/server";

type Context = {
  params: {
    id: string;
  };
};

type MealSelection = {
  mealType: string;
  mealId: number;
  mealTitle: string;
  mealDescription: string;
};
type DailySchedule = { date: string; meals: MealSelection[] };

export async function DELETE(request: Request, context: Context) {
  const session = await getServerSession(authOptions);
  const { id } = context.params;

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const subscription = await Subscription.findById(id);

    if (
      !subscription ||
      (subscription.userEmail !== session.user.email &&
        session.user.role !== "admin")
    ) {
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
  } catch (error: unknown) {
    console.error("API DELETE Error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "An unknown server error occurred";
    return NextResponse.json(
      { message: "Server error", error: message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, context: Context) {
  const session = await getServerSession(authOptions);
  const { id } = context.params;

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    await dbConnect();

    const subscription = await Subscription.findById(id);

    if (
      !subscription ||
      (subscription.userEmail !== session.user.email &&
        session.user.role !== "admin")
    ) {
      return NextResponse.json(
        { message: "Forbidden or Not Found" },
        { status: 403 }
      );
    }

    const updateData: { status?: string; schedule?: DailySchedule[] } = {};

    if (body.status) {
      if (!["active", "paused"].includes(body.status)) {
        return NextResponse.json(
          { message: "Invalid status update" },
          { status: 400 }
        );
      }
      updateData.status = body.status;
    }

    if (body.schedule) {
      updateData.schedule = body.schedule;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "No valid fields to update." },
        { status: 400 }
      );
    }

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return NextResponse.json(
      { success: true, data: updatedSubscription },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("API PATCH Error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "An unknown server error occurred";
    return NextResponse.json(
      { message: "Server error", error: message },
      { status: 500 }
    );
  }
}
