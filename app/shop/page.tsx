"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaCheckCircle } from "react-icons/fa";
import { LuQuote, LuShoppingCart } from "react-icons/lu";
import { toast } from "sonner";
import { useCart } from "../../context/CartContext";
import FilterTwo from "@/components/FilterTwo";
import { BsStarFill } from "react-icons/bs";
import Manufacturing from "@/components/Manufacturing";

type Product = {
  _id: string;
  name: string;
  image: string;
  category: string;
  highlight?: string;
  price: number;
  discount: number;
  stock: number;
  rating?: number; // Average rating e.g. 4.5
  totalReviews?: number; // Total review count
  createdAt?: string; // Product creation date for "New" badge
};

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { addToCart } = useCart();

  // ✅ Add product to cart with toast
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`, {
      icon: <FaCheckCircle className="text-black text-xl" />,
    });
  };

  // ✅ Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const json = await res.json();
        setProducts(json.products || []); // ✅ correct key
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]); // fallback
      }
    };
    fetchProducts();
  }, []);

  // ✅ Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // ✅ Render star rating
  const renderStars = (rating: number = 0) =>
    [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={i < Math.round(rating) ? "text-yellow-500" : "text-gray-300"}
      />
    ));

  // ✅ Check if product is new (within 14 days)
  const isNewProduct = (createdAt?: string) => {
    if (!createdAt) return false;
    const created = new Date(createdAt);
    const now = new Date();
    const diffDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 14;
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
    <div>
      <main className="mt-16">
        {/* Page Header */}
        <div className="container mx-auto pb-28 text-center">
          <h1 className="text-3xl font-bold">Shop Medicines</h1>
          <p className="mt-3 max-w-2xl mx-auto text-gray-600">
            Explore our premium range of healthcare and pharmaceutical products at the best prices.
          </p>
        </div>

        {/* Filter Section */}
        <FilterTwo
          searchQuery={searchQuery}
          handleSearch={(e) => setSearchQuery(e.target.value)}
          selectedCategory={selectedCategory}
          handleFilter={setSelectedCategory}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Product Display */}
        {viewMode === "grid" ? (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto my-14 px-6 md:px-0">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
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
                    {product.stock === 0 ? (
                      <span className="absolute top-3 right-3 bg-gray-900 text-white text-xs px-3 py-1 rounded-full">
                        Out of Stock
                      </span>
                    ) : isNewProduct(product.createdAt) ? (
                      <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                        New
                      </span>
                    ) : null}
                  </div>

                  <div className="p-5">
                    <span className="text-sm font-medium text-secondary">
                      {product.category}
                    </span>
                    <h4 className="text-lg font-semibold mt-1">{product.name}</h4>
                    <p className="text-gray-500 text-sm mb-2">{product.highlight}</p>

                    <div className="flex items-center gap-1 text-sm mb-3">
                      {renderStars(product.rating)}
                      <span className="text-gray-500 ml-1">
                        ({product.totalReviews || 0} reviews)
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xl font-bold text-primary">
                        ₦{product.discount.toLocaleString()}
                      </span>
                      {product.price > product.discount && (
                        <span className="line-through text-gray-400 text-sm">
                          ₦{product.price.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        className={`w-[70%] text-center rounded-xl flex items-center justify-center gap-x-2 py-2 font-semibold ${
                          product.stock === 0
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-primary text-white hover:bg-red-700 transition"
                        }`}
                      >
                        <LuShoppingCart className="text-xl text-white" />
                        Add to Cart
                      </button>
                      <Link
                        href={`/details/${product._id}`}
                        className="w-[30%] border border-secondary text-secondary text-center py-2 rounded-xl hover:bg-gray-100 transition"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-500">No products found.</p>
            )}
          </div>
        ) : (
          // List View
          <div className="flex flex-col gap-6 container mx-auto px-6 my-14">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col md:flex-row justify-between items-center bg-white border border-lightGray rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  <div className="relative w-full md:w-1/4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="object-cover w-full h-52 md:h-full"
                    />
                    {product.stock === 0 ? (
                      <span className="absolute top-3 right-3 bg-gray-900 text-white text-xs px-3 py-1 rounded-full">
                        Out of Stock
                      </span>
                    ) : isNewProduct(product.createdAt) ? (
                      <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                        New
                      </span>
                    ) : null}
                  </div>

                  <div className="p-5 flex-1 flex flex-row justify-between items-center">
                    <div className="md:w-[50%]">
                      <span className="text-sm text-secondary">{product.category}</span>
                      <h4 className="text-lg font-semibold">{product.name}</h4>
                      <p className="text-gray-600 text-sm mt-1">{product.highlight}</p>

                      <div className="flex items-center gap-1 text-sm my-3">
                        {renderStars(product.rating)}
                        <span className="text-gray-500 ml-1">
                          ({product.totalReviews || 0} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-end md:w-[40%]">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xl font-bold text-primary">
                          ₦{product.discount.toLocaleString()}
                        </span>
                        {product.price > product.discount && (
                          <span className="line-through text-gray-400 text-sm">
                            ₦{product.price.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock === 0}
                          className={`px-5 py-2 rounded-md font-semibold flex items-center gap-2 ${
                            product.stock === 0
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-primary text-white hover:bg-red-700 transition"
                          }`}
                        >
                          <LuShoppingCart className="text-xl text-white" />
                          Add to Cart
                        </button>
                        <Link
                          href={`/details/${product._id}`}
                          className="border border-gray-300 px-5 py-2 rounded-md hover:bg-gray-100 transition"
                        >
                          Details
                        </Link>
                        {product.stock === 0 ? (
                          <span className="text-gray-500 text-sm">Out of Stock</span>
                        ) : (
                          <span className="text-green-600 text-sm">
                            In Stock ({product.stock})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No products found.</p>
            )}
          </div>
        )}

        {/* Testimonials */}
        <section className=" py-16 px-7 md:px-0  max-w-7xl mx-auto">
          <div className="text-center">
            <h2>See What Clients Are Saying</h2>
            <p className=" mt-3 max-w-3xl mx-auto">
              We are very proud of the service we provide and stand by every product we carry. Read our testimonials from our happy customers.
            </p>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-5 mt-12">
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
    </div>
  );
}
