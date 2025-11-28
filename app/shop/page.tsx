"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsStarFill } from "react-icons/bs";
import { LuShoppingCart, LuQuote } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "sonner";
import { useCart, Product } from "@/context/CartContext";
import FilterTwo from "@/components/FilterTwo";

export default function Shop() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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
    addToCart({ ...product}); // ✅ Fix applied
    toast.success(`${product.name} added to cart`, {
      icon: <FaCheckCircle className="text-black text-xl" />,
    });
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="mt-16">
      <div className="container mx-auto pb-28 text-center">
        <h1 className="text-3xl font-bold">Shop Medicines</h1>
      </div>

      <FilterTwo
        searchQuery={searchQuery}
        handleSearch={(e) => setSearchQuery(e.target.value)}
        selectedCategory={selectedCategory}
        handleFilter={setSelectedCategory}
        viewMode="grid"
        setViewMode={() => {}}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto my-14 px-6 md:px-0">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="relative">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={250}
                className="object-cover w-full h-52"
              />
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
    </main>
  );
}
