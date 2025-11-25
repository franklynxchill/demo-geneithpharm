"use client";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#B02025] text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Geneith Pharmaceuticals Ltd.</h2>
          <p className="text-sm text-gray-200 leading-relaxed">
            Providing affordable and quality healthcare solutions across Nigeria through trusted pharmaceutical innovation and partnerships.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/products" className="hover:underline">Products</Link></li>
            <li><Link href="/distributors" className="hover:underline">Distributors</Link></li>
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="text-sm space-y-2">
            <li><span className="font-semibold">Address:</span> 5B, Olayiwola Street, Ilupeju, Lagos, Nigeria</li>
            <li><span className="font-semibold">Phone:</span> +234 802 123 4567</li>
            <li><span className="font-semibold">Email:</span> info@geneithpharm.com</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-3 mt-2">
            <a href="https://facebook.com" target="_blank" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 mt-8 pt-4 text-center text-sm text-gray-200">
        © {new Date().getFullYear()} Geneith Pharmaceuticals Ltd. All Rights Reserved.
      </div>
    </footer>
  );
}
