"use client";
import { FiUser } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { IoMenuOutline, IoClose } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/public/uploads/logo.png";
import { useCart } from "@/context/CartContext"; // import

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { cart } = useCart();

  return (
    <div className="border-b-4 border-b-secondary shadow-2xl">
      <div className="container mx-auto flex flex-row items-center justify-between py-3 px-7 md:px-0 relative">
        
        {/* Logo */}
        <Link href="/home">
          <Image
            src={Logo}
            alt="geneith.logo"
            width={120}   // ✅ required
            height={50}   // ✅ required
            className="w-[6rem] md:w-[8rem] h-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:block">
          <ul className="flex flex-row items-center gap-x-8">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About Us" },
              { href: "/products", label: "Products" },
              { href: "/shop", label: "Shop" },
              { href: "/blog", label: "Blog" },
              { href: "/distributor", label: "Distributor" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${pathname === item.href ? "btn-two" : ""} transition-colors duration-200`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side */}
        <div className="flex flex-row items-center gap-x-6">
          {/* Cart */}
          <Link href="/cart" className="relative">
            <LuShoppingCart className="text-2xl" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs px-1">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Login */}
          <Link
            href="/login"
            className="hidden lg:flex flex-row items-center gap-x-5 btn-three"
          >
            <FiUser />
            Login
          </Link>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden cursor-pointer">
            {isOpen ? <IoClose className="text-2xl" /> : <IoMenuOutline className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="absolute left-7 top-20 w-[88%] bg-card shadow rounded-xl z-50">
            <ul className="flex flex-col items-start gap-y-4 py-3 px-4">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/products", label: "Products" },
                { href: "/shop", label: "Shop" },
                { href: "/blog", label: "Blog" },
                { href: "/distributor", label: "Distributor" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <li key={item.href} className="w-full">
                  <Link
                    href={item.href}
                    className={`block w-full px-4 py-2 rounded-xl ${
                      pathname === item.href ? "bg-primary text-white" : "text-gray-700"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              {/* Mobile Login */}
              <li className="w-full">
                <Link
                  href="/login"
                  className="flex flex-row items-center justify-center gap-x-3 btn-two w-full py-3"
                  onClick={() => setIsOpen(false)}
                >
                  <FiUser />
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}
