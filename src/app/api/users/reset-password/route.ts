import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { email, newPassword } = reqBody;

  if (!email || !newPassword) {
    return NextResponse.json(
      {
        message: "Email and password are required",
      },
      { status: 400 }
    );
  }

  try {
    // Connect to the database
    await connect();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          message: "User not found. Check your email.",
        },
        { status: 404 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    // Update user password
    user.password = hashedPassword;
    await user.save();

    // Return a success response
    return NextResponse.json(
      {
        message: "Password reset successful!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      {
        message: "Error resetting password. Please try again.",
      },
      { status: 500 }
    );
  }
}
