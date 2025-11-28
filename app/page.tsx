"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BsStarFill } from "react-icons/bs";
import { LuQuote } from "react-icons/lu";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { toast } from "sonner";
import { useCart, Product } from "@/context/CartContext";

import basketDrugs from "@/public/uploads/Basket-of-Geneith-Drugs-1407x2048.png";

export default function Home() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const json = await res.json();
        setProducts(json.products || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product}); // ✅ Fix: quantity
    toast.success(`${product.name} added to cart`, {
      icon: <FaCheckCircle className="text-black text-xl" />,
    });
  };

  const testimonials = [
    {
      name: "Mrs udoh",
      role: "Via Facebook",
      content:
        "Camosunate is my family anti malaria drug...",
      rating: 5,
    },
    {
      name: "Auwal Dogara",
      role: "Via Facebook",
      content: "Actually boneflex is good...",
      rating: 5,
    },
    {
      name: "Abigail Ezinne",
      role: "Via Facebook",
      content: "The rash-like symptoms began to resolve...",
      rating: 5,
    },
  ];

  return (
    <div className="mt-16 md:mt-0">
      {/* HERO */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row gap-5 items-center px-7 md:px-0">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="mb-2 max-w-xl">
            25 Years of Trusted, Affordable Care in Nigeria
          </h1>
          <span>Affordable, effective healthcare solutions for every Nigerian.</span>
          <div className="mt-5 mb-8">
            <Link href="/products" className="btn-one">
              Explore Products
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <Image src={basketDrugs} alt="basketDrugs" width={500} height={500} />
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-16 bg-light-gray mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2>Featured Products</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 container mx-auto my-14 px-6 md:px-0">
          {products.slice(0, 4).map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={250}
                  className="object-cover w-full h-52"
                />
                <div className="absolute left-3 top-3">
                  <span className="text-sm font-medium bg-secondary text-white py-2 px-3 rounded-2xl">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h4 className="text-lg font-semibold mt-1">{product.name}</h4>
                <p className="text-gray-500 text-sm mb-2">{product.highlight}</p>
                <div className="flex items-center justify-between gap-3 mt-5">
                  <span className="text-xl font-bold text-primary">
                    ₦{product.discount?.toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-[50%] text-center rounded-xl bg-primary text-white py-2 hover:bg-red-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 max-w-7xl mx-auto px-7 md:px-0">
        <div className="text-center">
          <h2>See What Clients Are Saying</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-light-gray p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(t.rating)].map((_s, idx) => (
                  <BsStarFill key={idx} className="h-4 w-4 text-yellow-400" />
                ))}
              </div>
              <h4 className="font-bold">{t.name}</h4>
              <p className="text-sm">{t.role}</p>
              <div className="flex gap-3 mt-6">
                <LuQuote className="text-2xl" />
                <p>"{t.content}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
