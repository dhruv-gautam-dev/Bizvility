import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Filter } from "lucide-react";
import CategoryData from "../../data/Categories.js";

const CategoryGrid = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const filters = ["all", "popular", "new", "trending"];

  const filteredCategories =
    activeFilter === "all"
      ? CategoryData
      : CategoryData.filter((category) => category.tags.includes(activeFilter));

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col mb-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              All Categories
            </h2>
            <p className="max-w-2xl text-gray-600">
              Browse through all of our business categories to find exactly what
              you're looking for
            </p>
          </div>

          <div className="flex items-center mt-6 md:mt-0">
            <Filter className="w-5 h-5 mr-2 text-gray-500" />
            <div className="flex space-x-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`px-4 py-2 rounded-md text-sm capitalize ${
                    activeFilter === filter
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } transition-colors`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="overflow-hidden transition-shadow border border-gray-200 rounded-lg hover:shadow-md"
            >
              <div
                className="h-40 bg-center bg-cover"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <div className="flex items-end h-full p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-xl font-semibold text-white">
                    {category.name}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <p className="mb-4 text-gray-600">{category.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.subcategories.slice(0, 3).map((sub, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full"
                    >
                      {sub}
                    </span>
                  ))}
                  {category.subcategories.length > 3 && (
                    <span className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full">
                      +{category.subcategories.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {category.listingCount} listings
                  </span>
                  <Link
                    to={`/categories/${category.slug}`}
                    className="flex items-center font-medium text-blue-600 hover:text-blue-700"
                  >
                    View <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700">
            Load More Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
