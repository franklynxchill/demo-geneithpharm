import { NextResponse } from "next/server";
import { Resend } from "resend";
import { connectDB } from "@/lib/db";
import Message from "@/models/Message";

// Only instantiate Resend if the API key exists
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: "All fields required" }, { status: 400 });
    }

    // Save message to the database
    await connectDB();
    await Message.create({ name, email, message });

    // Only send email if Resend is configured
    if (resend) {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'franklinonyenechere@gmail.com',
        subject: `New Message from ${name}`,
        text: `From: ${name}\nEmail: ${email}\nMessage: ${message}`,
      });
    } else {
      console.warn("RESEND_API_KEY not set – skipping email send.");
    }

    return NextResponse.json({ success: true, message: "Message saved!" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}
