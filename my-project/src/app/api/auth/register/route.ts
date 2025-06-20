import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { fullName, email, password } = await request.json();

    if (!fullName || !email || !password || password.length < 8) {
      return NextResponse.json(
        {
          message:
            "Invalid input. Password must be at least 8 characters long.",
        },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already in use." },
        { status: 409 }
      );
    }

    await User.create({ fullName, email, password });

    return NextResponse.json(
      { message: "User registered successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration Error: ", error);
    return NextResponse.json(
      { message: "An error occurred during registration." },
      { status: 500 }
    );
  }
}
