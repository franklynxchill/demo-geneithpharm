"use client";
import Link from "next/link";
import { FaRegCheckCircle } from "react-icons/fa";



export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <FaRegCheckCircle className="text-green-600 w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
      <p className="text-gray-600 mb-6">Thank you for your purchase 🎉</p>
      <Link href="/products" className="bg-[#B02025] text-white py-2 px-4 rounded-md">
        Continue Shopping
      </Link>
    </div>
  );
}
