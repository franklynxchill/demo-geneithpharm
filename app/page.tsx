"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BsStarFill } from "react-icons/bs";
import { FiAward, FiUsers } from "react-icons/fi";
import { LuQuote, LuShield } from "react-icons/lu";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

import basketDrugs from "@/public/uploads/Basket-of-Geneith-Drugs-1407x2048.png";
import medicalAssociation from "@/public/uploads/Nigerian-Medical-Association-150x150.png";
import communityPharmacists from "@/public/uploads/Association-of-Community-Pharmacists-of-Nigeria-150x150.png";
import associationHospital from "@/public/uploads/National-Association-of-Hospital-and-Administrative-Pharmacists-of-Nigeria-150x150.png";

// ------------------------------
// PRODUCT TYPE
// ------------------------------
type Product = {
  _id: string;
  name: string;
  image: string;
  category: string;
  highlight?: string;
  price: number;
  discount: number;
  stock: number;
  rating?: number;
  totalReviews?: number;
  createdAt?: string;
};

// ------------------------------
// MAIN HOME PAGE COMPONENT
// ------------------------------
export default function Home() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  // Add to cart handler
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`, {
      icon: <FaCheckCircle className="text-black text-xl" />,
    });
  };

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const json = await res.json();
        setProducts(json.products || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Testimonial data
  const testimonials = [
    {
      name: "Mrs udoh",
      role: "Via Facebook",
      content:
        "Camosunate is my family anti malaria drug, my children conume the dispersible while my husband and I take the adult dose. Thanks to Geneith Pharmaceuticals!",
      rating: 5,
    },
    {
      name: "Auwal Dogara",
      role: "Via Facebook",
      content:
        "Actually boneflex is good I used it years back for my arthritis and I can attest that it is the best of its kind in the market. i highly recommend it for others",
      rating: 5,
    },
    {
      name: "Abigail Ezinne",
      role: "Via Facebook",
      content:
        "The rash-like symptoms began to resolve within hours. I had tried several types of topical creams that did not have any effect but ketineal come through for me",
      rating: 5,
    },
  ];

  return (
    <div className=" mt-16 md:mt-0">
      {/* ============================== */}
      {/* HERO SECTION */}
      {/* ============================== */}
      <section className=" max-w-7xl mx-auto flex flex-col md:flex-row gap-5 items-center px-7 md:px-0 ">
        <div className=" md:w-1/2 text-center md:text-left">
          <h1 className=" mb-2 max-w-xl">25 Years of Trusted, Affordable Care in Nigeria</h1>
          <span>Affordable, effective healthcare solutions for every Nigerian.</span>
          <p className=" mt-5 mb-8 max-w-[38rem] ">
            For 25 years, Geneith Pharmaceuticals has been at the forefront of improving healthcare for Nigerians...
          </p>

          <div className=" flex flex-col md:flex-row gap-x-8 gap-y-5  items-center">
            <Link href="/products" className="btn-one w-full md:w-52 text-center">
              Explore Our Products
            </Link>
            <Link href="/about" className=" btn-two w-full md:w-60 text-center">
              Learn More About Us
            </Link>
          </div>
        </div>

        <div className=" md:w-1/2">
          <Image src={basketDrugs} alt="basketDrugs" width={500} height={500} />
        </div>
      </section>

      {/* ============================== */}
      {/* COMPANY HIGHLIGHTS */}
      {/* ============================== */}
      <section className=" max-w-7xl mx-auto px-7 md:px-0 ">
        <div className="text-center">
          <h2>Why Choose Geneith Pharmaceuticals?</h2>
          <p className=" mt-3 max-w-3xl mx-auto">
            Trusted by healthcare professionals across Nigeria...
          </p>
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-5 mt-12">
          <div className=" flex flex-col items-center justify-center text-center bg-light-gray p-6 sm:p-8 rounded-2xl shadow-lg">
            <div className="bg-secondary rounded-lg w-20 h-20 flex justify-center items-center">
              <FiAward className="  text-4xl text-white" />
            </div>
            <h3 className=" mt-7 mb-4">WHO Certified</h3>
            <p>Our manufacturing facility meets international WHO standards...</p>
          </div>

          <div className=" flex flex-col items-center justify-center text-center bg-light-gray p-6 sm:p-8 rounded-2xl shadow-lg">
            <div className="bg-primary rounded-lg w-20 h-20 flex justify-center items-center">
              <LuShield className="  text-4xl text-white" />
            </div>
            <h3 className=" mt-7 mb-4">25+ Years Experience</h3>
            <p>Since 2000, we've been pioneering affordable healthcare...</p>
          </div>

          <div className=" flex flex-col items-center justify-center text-center bg-light-gray p-6 sm:p-8 rounded-2xl shadow-lg">
            <div className="bg-secondary rounded-lg w-20 h-20 flex justify-center items-center">
              <FiUsers className="  text-4xl text-white" />
            </div>
            <h3 className=" mt-7 mb-4">Nationwide Presence</h3>
            <p>Serving healthcare providers and patients across 36 states...</p>
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* FEATURED PRODUCTS */}
      {/* ============================== */}
      <section className="py-16 bg-light-gray mt-20">
        <div className="max-w-7xl mx-auto text-center mt-5">
          <h2>Featured Products</h2>
          <p className=" mt-3 max-w-3xl mx-auto">
            Discover our most trusted pharmaceutical products...
          </p>
        </div>

        {/* ⭐ SHOW ONLY 4 PRODUCTS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 container mx-auto my-14 px-6 md:px-0">
          {products.slice(0, 4).map((product) => (
            <div key={product._id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
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
                    ₦{product.discount.toLocaleString()}
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

        {/* ⭐ SHOW MORE BUTTON → SHOP PAGE */}
        <div className="text-center my-10">
          <Link
            href="/products"
            className="px-6 py-3 flex items-center justify-center w-[16rem] mx-auto gap-x-5 bg-primary text-white rounded-xl hover:bg-secondary/80 transition font-semibold"
          >
            View All Products
            <FaArrowRight className=" text-lg text-white" />
          </Link>
        </div>
      </section>

      {/* ============================== */}
      {/* TESTIMONIALS */}
      {/* ============================== */}
      <section className=" py-16 max-w-7xl mx-auto px-7 md:px-0 ">
        <div className="text-center">
          <h2>See What Clients Are Saying</h2>
          <p className=" mt-3 max-w-3xl mx-auto">
            We are very proud of the service we provide...
          </p>
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-5 mt-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-light-gray p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
            >
              <div className="flex items-center gap-1 mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <BsStarFill key={i} className="h-4 w-4 text-yellow-400" />
                ))}
              </div>

              <h4 className="font-bold">{testimonial.name}</h4>
              <p className="text-sm">{testimonial.role}</p>

              <div className="flex gap-3 mt-6">
                <LuQuote className="text-2xl" />
                <p>"{testimonial.content}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================== */}
      {/* PARTNER SECTION */}
      {/* ============================== */}
      <section className="bg-light-gray py-16">
        <div className="max-w-7xl mx-auto px-7 md:px-0 text-center">
          <h2>We Work With The Best Partners</h2>
          <p className=" mt-3 max-w-3xl mx-auto">
            We view our partners as an extension of our team...
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-5 mt-12 max-w-7xl mx-auto px-7 md:px-0">
          <div className="flex flex-col items-center gap-5 bg-card rounded-2xl py-5">
            <Image src={medicalAssociation} alt="Nigerian Medical Association" />
            <span className="font-medium">Nigerian Medical Association</span>
          </div>

          <div className="flex flex-col items-center gap-5 bg-card rounded-2xl py-5 px-3 text-center">
            <Image src={associationHospital} alt="Hospital Pharmacists" />
            <span className="font-medium">
              National Association of Hospital and Administrative Pharmacists of Nigeria
            </span>
          </div>

          <div className="flex flex-col items-center gap-5 bg-card rounded-2xl py-5 px-4 text-center">
            <Image src={communityPharmacists} alt="Community Pharmacists" />
            <span className="font-medium">Association of Community Pharmacists of Nigeria</span>
          </div>
        </div>
      </section>
    </div>
  );
}
