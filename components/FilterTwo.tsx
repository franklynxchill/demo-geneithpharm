"use client";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { FaThLarge, FaList } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

type SearchProps = {
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCategory: string;
  handleFilter: (category: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
};

export default function FilterTwo({
  searchQuery,
  handleSearch,
  selectedCategory,
  handleFilter,
  viewMode,
  setViewMode,
}: SearchProps) {
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const categories = [
    "All",
    "Anti-Malarials",
    "Antibiotics",
    "Anti-Hypertensives",
    "Anti-Ulcers",
    "Anti-Fungals",
    "Anti-Helminthics",
    "Nutritional Supplements",
    "Analgesics",
    "Aphrodisiacs",
    "Diluents",
  ];

  return (
    <div className="relative bg-light-gray backdrop-blur-md border-b border-gray-200 py-10 px-7 md:px-0 shadow-sm transition-all duration-300">
      <div className="container mx-auto flex flex-col md:flex-row items-center flex-wrap gap-4 justify-between">

        {/* 🔍 Search Bar + View Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-[90%] mx-auto md:w-full">
          <div className="bg-white flex items-center gap-x-3 py-2.5 px-4 rounded-3xl w-full sm:w-[70%] md:w-[60%] shadow-sm border border-gray-200">
            <IoSearch className="text-2xl text-gray-600" />
            <input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              className="border-0 w-full bg-transparent outline-none text-gray-800 cursor-pointer"
            />
          </div>

          {/* 👇 Grid/List Toggle */}
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-500 mr-2">View:</span>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg cursor-pointer shadow-sm transition-all ${
                viewMode === "grid"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaThLarge size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg cursor-pointer shadow-sm transition-all ${
                viewMode === "list"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaList size={18} />
            </button>
          </div>
        </div>

        {/* 🏷️ Categories + Filter Icon (mobile) */}
        <div className="flex flex-row items-center gap-x-4 w-full md:w-auto mt-2 md:mt-0 hidden md:block">
          {/* 🔘 Mobile Filter Icon */}
          <button
            className="text-black text-2xl md:hidden fixed top-20 left-4 bg-white shadow-md p-2 rounded-full z-50"
            onClick={() => setShowMobileFilter(true)}
          >
            <FiFilter />
          </button>

          {/* 💻 Desktop Categories */}
          <div className="hidden md:flex overflow-x-auto gap-3 py-2 scrollbar-hide md:flex-wrap md:overflow-visible">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilter(category)}
                className={`whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-md scale-105"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 📱 Mobile Category Drawer */}
      {showMobileFilter && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
            onClick={() => setShowMobileFilter(false)}
          ></div>

          {/* Sidebar */}
          <div className="fixed top-0 left-0 w-3/4 h-full bg-white z-50 shadow-lg p-6 transition-transform duration-300 animate-slide-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Filter by Category</h3>
              <button
                onClick={() => setShowMobileFilter(false)}
                className="text-2xl text-gray-600 hover:text-black transition"
              >
                <IoClose />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    handleFilter(category);
                    setShowMobileFilter(false);
                  }}
                  className={`text-left w-full rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
