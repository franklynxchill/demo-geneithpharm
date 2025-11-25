import { connectDB } from "@/lib/mongodb";
import Distributor from "@/models/Distributor";

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const distributor = await Distributor.create(data);
    return Response.json({ message: "Form submitted successfully", distributor }, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Failed to submit form" }, { status: 500 });
  }
}
