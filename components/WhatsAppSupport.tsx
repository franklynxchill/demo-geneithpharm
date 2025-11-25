"use client";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppSupport() {
  const phoneNumber = "2348012345678"; // WhatsApp number (no + sign)
  const message = "Hello Geneith Pharm! I'd like to make an inquiry.";

  // Encode message for URL
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg z-50 flex items-center justify-center animate-bounce"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-3xl" />
    </Link>
  );
}
