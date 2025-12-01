"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { LuQuote, LuShoppingCart } from "react-icons/lu";
import { useCart } from "../../context/CartContext";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "sonner";
import FilterOne from "@/components/FilterOne";
import { BsStarFill } from "react-icons/bs";
import Manufacturing from "@/components/Manufacturing";

type Product = {
  _id: string;
  name: string;
  image: string;
  category: string;
  highlight?: string;
  description?: string;
  price: number;
  discount?: number;
  stock?: number;
};

export default function Page() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ✅ FETCH PRODUCTS FROM API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const json = await res.json();

        // FIX: Correct backend response key
        setProducts(json.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  // 🔍 FILTER PRODUCTS (safe even if empty)
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // 🛒 ADD TO CART (with toast)
  const handleAddToCart = (product: Product) => {
    const cartItem = { ...product, quantity: 1 }; // ✅ Add quantity
    addToCart(cartItem);

    toast.success(`${product.name} added to cart`, {
      icon: <FaCheckCircle className="text-primary text-xl" />,
    });
  };


  const testimonials = [
    {
      name: 'Mrs udoh',
      role: 'Via Facebook',
      content: 'Camosunate is my family anti malaria drug, my children conume the dispersible while my husband and I take the adult dose. Thanks to Geneith Pharmaceuticals!',
      rating: 5
    },
    {
      name: 'Auwal Dogara',
      role: 'Via Facebook',
      content: 'Actually boneflex is good I used it years back for my arthritis and I can attest that it is the best of its kind in the market. i highly recommend it for others',
      rating: 5
    },
    {
      name: 'Abigail Ezinne',
      role: 'Via Facebook',
      content: 'The rash-like symptoms began to resolve within hours. I had tried several types of topical creams that did not have any effect but ketineal come through for me',
      rating: 5
    }
  ];

  return (
    <main className="mt-16">
      <div className="container mx-auto pb-28 px-7 md:px-0  text-center">
        <h1 className="text-3xl font-semibold">Our Products</h1>
        <p className="mt-3 max-w-2xl mx-auto text-gray-600">
          Discover our comprehensive range of high-quality pharmaceutical products.
        </p>
      </div>
      
      {/* 🔍 Search + Filter Component */}
      <FilterOne
        searchQuery={searchQuery}
        handleSearch={(e) => setSearchQuery(e.target.value)}
        selectedCategory={selectedCategory}
        handleFilter={setSelectedCategory}
      />

      {/* 🛒 Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 container mx-auto gap-8 mt-16 mb-14 px-7 md:px-0 ">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const finalPrice = product.discount
              ? product.price - (product.price * product.discount) / 100
              : product.price;

            return (
              <div
                key={product._id}
                className="shadow rounded-2xl overflow-hidden"
              >
                {/* Product Image */}
                <div className="flex justify-center items-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="object-contain"
                  />
                </div>

                {/* Product Details */}
                <div className="pt-9 pb-8 px-6 bg-card rounded-b-2xl border-t-2 border-t-lightGray">
                  <span className="py-1.5 px-3 bg-secondary rounded-2xl text-[12px] text-white">
                    {product.category}
                  </span>

                  <h4 className="my-3 font-semibold">{product.name}</h4>

                  {product.highlight && (
                    <p className="text-gray-600">{product.highlight}</p>
                  )}

                  {/* Price Section */}
                  <div className="flex justify-between my-2">
                    {/* Company Price (actual selling price) */}
                    <span className="text-xl font-bold text-primary">
                      ₦{(product.discount ?? product.price).toLocaleString()}
                    </span>

                    {/* Retailer Price (shown only if higher than company price) */}
                    {product.discount && product.price > product.discount && (
                      <span className="line-through text-gray-400 text-sm">
                        ₦{product.price.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-primary py-3 w-full text-white rounded-3xl flex items-center justify-center gap-x-4 hover:bg-red-700 transition"
                  >
                    <LuShoppingCart className="text-xl text-white" />
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-1 md:col-span-3 flex justify-center items-center">
            <p className="text-center text-gray-600 text-lg font-medium">
              No products found.
            </p>
          </div>
        )}
      </div>

      
      {/* Testimonials */}
      <section className=" py-16 px-7 md:px-0  max-w-7xl mx-auto">
        <div className="text-center">
          <h2>See What Clients Are Saying</h2>
          <p className=" mt-3 max-w-3xl mx-auto">
            We are very proud of the service we provide and stand by every product we carry. Read our testimonials from our happy customers.
          </p>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {testimonials.map((testimonial, index) => (
            <div key={index}  className="bg-light-gray p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <BsStarFill key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <h4 
                className="font-bold text-brand-black text-sm sm:text-base mb-1"
              >   
                {testimonial.name}
              </h4>
              <p className="text-xs sm:text-sm text-brand-blue">
                {testimonial.role}
              </p>
              <div className=" flex gap-3 mt-5">
                <div><LuQuote className=" text-2xl"/></div>
                <div>
                  <p>"{testimonial.content}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Manufacturing /> 
    </main>
  );
}
