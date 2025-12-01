import { connectDB } from "@/lib/db";
import Distributor from "@/models/Distributor";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();
    const distributor = await Distributor.create(data);
    return NextResponse.json(
      { message: "Form submitted successfully", distributor },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 });
  }
}
