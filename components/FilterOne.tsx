"use client";
import { IoSearch } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";

type SearchProps = {
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCategory: string;
  handleFilter: (category: string) => void;
};

export default function FilterOne({
  searchQuery,
  handleSearch,
  selectedCategory,
  handleFilter,
}: SearchProps) {
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
    <div
      className="bg-lightGray py-6 px-4 md:px-0 shadow-md backdrop-blur-md"
    >
      <div className="container mx-auto flex flex-col gap-4">
        {/* 🔍 Search bar */}
        <div className="bg-white flex items-center gap-x-3 py-2.5 px-4 rounded-3xl w-full shadow-sm">
          <IoSearch className="text-2xl text-gray-600" />
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            className="border-0 w-full bg-transparent outline-none text-gray-800"
          />
        </div>

        <div className=" flex gap-x-4 items-baseline">
          {/* 🧩 Filter icon (mobile only) */}
          <button className="text-secondary text-2xl">
            <FiFilter />
          </button>

          {/* 🏷️ Category buttons */}
          <div className="flex overflow-x-auto gap-3 py-2 flex-wrap md:overflow-visible">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilter(category)}
                className={`whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
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
    </div>
  );
}
