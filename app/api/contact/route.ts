import { NextResponse } from "next/server";
import { Resend } from "resend";
import { connectDB } from "@/lib/db";
import Message from "@/models/Message";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: "All fields required" }, { status: 400 });
    }

    await connectDB();
    await Message.create({ name, email, message });

    await resend.emails.send({
      from: "contact@geneithpharm.com",
      to: "admin@geneithpharm.com",
      subject: `New Message from ${name}`,
      text: `From: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    return NextResponse.json({ success: true, message: "Message sent!" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}
