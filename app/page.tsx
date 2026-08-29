"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { FiAward, FiUsers } from "react-icons/fi";
import { LuQuote, LuShield } from "react-icons/lu";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { toast } from "sonner";

import { useCart } from "@/context/CartContext";

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

  // ------------------------------
  // ADD TO CART
  // ------------------------------

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      ...product,
      quantity: 1,
    };

    addToCart(cartItem);

    toast.success(`${product.name} added to cart`, {
      icon: <FaCheckCircle className="text-black text-xl" />,
    });
  };

  // ------------------------------
  // FETCH PRODUCTS
  // ------------------------------

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const json = await res.json();

        setProducts(json.products || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  // ------------------------------
  // TESTIMONIAL DATA
  // ------------------------------

  const testimonials = [
    {
      name: "Mrs Udoh",
      role: "Via Facebook",
      content:
        "Camosunate is my family anti malaria drug, my children consume the dispersible while my husband and I take the adult dose. Thanks to Geneith Pharmaceuticals!",
      rating: 5,
    },
    {
      name: "Auwal Dogara",
      role: "Via Facebook",
      content:
        "Actually Boneflex is good. I used it years back for my arthritis and I can attest that it is the best of its kind in the market. I highly recommend it for others.",
      rating: 5,
    },
    {
      name: "Abigail Ezinne",
      role: "Via Facebook",
      content:
        "The rash-like symptoms began to resolve within hours. I had tried several types of topical creams that did not have any effect but Ketineal came through for me.",
      rating: 5,
    },
  ];

  return (
    <div className="mt-16 md:mt-0">
      {/* ============================== */}
      {/* HERO SECTION */}
      {/* ============================== */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-5 items-center">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="mb-2 max-w-xl">
            25 Years of Trusted, Affordable Care in Nigeria
          </h1>

          <span>
            Affordable, effective healthcare solutions for every Nigerian.
          </span>

          <p className="mt-5 mb-8 max-w-152">
            For 25 years, Geneith Pharmaceuticals has been at the forefront of
            improving healthcare for Nigerians. Our passion for excellence
            drives us to produce high-quality, research-backed medicines that
            are both accessible and affordable. From our trusted formulations
            to our nationwide distribution, we are committed to ensuring every
            Nigerian has access to the care they deserve—today and for
            generations to come.
          </p>

          <div className="flex flex-col md:flex-row gap-x-8 gap-y-5 items-center">
            <Link
              href="/products"
              className="btn-one w-full md:w-52 text-center"
            >
              Explore Our Products
            </Link>

            <Link
              href="/about"
              className="btn-two w-full md:w-60 text-center"
            >
              Learn More About Us
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <Image
            src={basketDrugs}
            alt="Basket of Geneith Pharmaceuticals products"
            width={500}
            height={500}
            priority
            className="w-full max-w-lg h-auto"
          />
        </div>
      </section>

      {/* ============================== */}
      {/* COMPANY HIGHLIGHTS */}
      {/* ============================== */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center">
          <h2>Why Choose Geneith Pharmaceuticals?</h2>

          <p className="mt-3 max-w-3xl mx-auto">
            Trusted by healthcare professionals across Nigeria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-5 mt-12">
          {/* WHO Certified */}

          <div className="flex flex-col items-center justify-center text-center bg-light-gray p-6 sm:p-8 rounded-2xl shadow-lg">
            <div className="bg-secondary rounded-lg w-20 h-20 flex justify-center items-center">
              <FiAward className="text-4xl text-white" />
            </div>

            <h3 className="mt-7 mb-4">WHO Certified</h3>

            <p>
              Our manufacturing facility meets international WHO standards.
            </p>
          </div>

          {/* Experience */}

          <div className="flex flex-col items-center justify-center text-center bg-light-gray p-6 sm:p-8 rounded-2xl shadow-lg">
            <div className="bg-primary rounded-lg w-20 h-20 flex justify-center items-center">
              <LuShield className="text-4xl text-white" />
            </div>

            <h3 className="mt-7 mb-4">25+ Years Experience</h3>

            <p>
              Since 2000, we&apos;ve been pioneering affordable healthcare.
            </p>
          </div>

          {/* Nationwide Presence */}

          <div className="flex flex-col items-center justify-center text-center bg-light-gray p-6 sm:p-8 rounded-2xl shadow-lg">
            <div className="bg-secondary rounded-lg w-20 h-20 flex justify-center items-center">
              <FiUsers className="text-4xl text-white" />
            </div>

            <h3 className="mt-7 mb-4">Nationwide Presence</h3>

            <p>
              Serving healthcare providers and patients across 36 states.
            </p>
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* FEATURED PRODUCTS */}
      {/* ============================== */}
      <section className="py-12 sm:py-16 lg:py-24 bg-light-gray mt-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-center">
          <h2>Featured Products</h2>

          <p className="mt-3 max-w-3xl mx-auto">
            Discover our most trusted pharmaceutical products.
          </p>
        </div>

        {/* PRODUCT GRID */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-14">
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
                <h4 className="text-lg font-semibold mt-1">
                  {product.name}
                </h4>

                {product.highlight && (
                  <p className="text-gray-500 text-sm mb-2">
                    {product.highlight}
                  </p>
                )}

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

        {/* VIEW ALL PRODUCTS */}

        <div className="text-center my-10">
          <Link
            href="/products"
            className="px-6 py-3 flex items-center justify-center w-[16rem] mx-auto gap-x-5 bg-primary text-white rounded-xl hover:bg-secondary/80 transition font-semibold"
          >
            View All Products
            <FaArrowRight className="text-lg text-white" />
          </Link>
        </div>
      </section>

      {/* ============================== */}
      {/* TESTIMONIALS */}
      {/* ============================== */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2>See What Clients Are Saying</h2>

            <p className="mt-3 max-w-3xl mx-auto">
              We are very proud of the service we provide and stand by every
              product we carry. Read our testimonials from our happy
              customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-5 mt-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-light-gray p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
              >
                {/* Rating */}

                <div className="flex items-center gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <BsStarFill
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                {/* Name */}

                <h4 className="font-bold text-brand-black text-sm sm:text-base mb-1">
                  {testimonial.name}
                </h4>

                {/* Source */}

                <p className="text-xs sm:text-sm text-brand-blue">
                  {testimonial.role}
                </p>

                {/* Testimonial */}

                <div className="flex gap-3 mt-6">
                  <div>
                    <LuQuote className="text-2xl" />
                  </div>

                  <div>
                    <p>&quot;{testimonial.content}&quot;</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* PARTNERS */}
      {/* ============================== */}
      <section className="bg-light-gray py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2>We Work With The Best Partners</h2>

            <p className="mt-3 max-w-3xl mx-auto">
              We view our partners as an extension of our team, playing an
              important part in our go-to-market strategy and overall success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-5 mt-12">
            {/* Nigerian Medical Association */}
            <div className="flex flex-col items-center gap-5 bg-card rounded-2xl py-5 px-4 text-center">
              <Image
                src={medicalAssociation}
                alt="Nigerian Medical Association"
                width={150}
                height={150}
              />

              <span className="font-medium">
                Nigerian Medical Association
              </span>
            </div>

            {/* Hospital Pharmacists */}
            <div className="flex flex-col items-center gap-5 bg-card rounded-2xl py-5 px-3 text-center">
              <Image
                src={associationHospital}
                alt="National Association of Hospital and Administrative Pharmacists of Nigeria"
                width={150}
                height={150}
              />

              <span className="font-medium">
                National Association of Hospital and Administrative
                Pharmacists of Nigeria
              </span>
            </div>

            {/* Community Pharmacists */}
            <div className="flex flex-col items-center gap-5 bg-card rounded-2xl py-5 px-4 text-center">
              <Image
                src={communityPharmacists}
                alt="Association of Community Pharmacists of Nigeria"
                width={150}
                height={150}
              />

              <span className="font-medium">
                Association of Community Pharmacists of Nigeria
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}