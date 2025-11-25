// /app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();

    const {
      fullName,
      email,
      phone,
      address,
      password,
      acceptTerms,
      allowMarketing,
    } = await req.json();

    // Validate required fields
    if (!fullName || !email || !password || !acceptTerms) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields or Terms not accepted",
        },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      phone,
      address,
      password: hashedPassword,
      acceptTerms, // ✓ Store Terms acceptance
      allowMarketing: allowMarketing || false, // ✓ Store marketing preference
    });

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        acceptTerms: newUser.acceptTerms,
        allowMarketing: newUser.allowMarketing,
      },
    });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    return NextResponse.json(
      { success: false, message: "Error registering user" },
      { status: 500 }
    );
  }
}
