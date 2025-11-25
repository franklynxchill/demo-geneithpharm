import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// CREATE Product
export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const newProduct = await Product.create(data);
    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Product creation failed:", error);
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 });
  }
}

// GET All Products
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Fetch products failed:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
  }
}
