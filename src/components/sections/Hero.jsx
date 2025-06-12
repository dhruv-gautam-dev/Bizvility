import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";

function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src="https://images.pexels.com/photos/1036657/pexels-photo-1036657.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full"
      />
      {/* Blue overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgb(30, 58, 138, 1) 0%, rgb(30, 58, 138, .5) 50%, rgba(15, 23, 42, 0.3) 80%, rgba(15, 23, 42, 0.05) 100%)",
        }}
      ></div>

      {/* Content */}
      <div className="container relative z-10 max-w-5xl px-4 mx-auto text-center text-white">
        <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          Discover the Best Local Businesses
        </h1>
        <p className="mb-8 text-xl">
          Find top-rated services and businesses in your area, all in one place.
        </p>

        {/* Search Form */}
        <form
          className="flex items-center justify-between w-4/5 px-2 py-2 mx-auto mb-8 bg-white rounded-lg shadow-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex items-center flex-1 mr-2">
            <Search className="w-5 h-5 mr-2 text-gray-400" />
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full h-12 px-2 text-gray-700 bg-transparent border-none outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center flex-1 pl-2 mr-2 border-l border-gray-200">
            <MapPin className="w-5 h-5 mr-2 text-gray-400" />
            <input
              type="text"
              placeholder="Location"
              className="w-full h-12 px-2 text-gray-700 bg-transparent border-none outline-none"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="h-12 px-6 font-semibold text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {[
            "Restaurants",
            // 'Shopping',
            "Health",
            // 'Services',
            // 'Auto',
            // "Home",
            "Beauty & Spa",
          ].map((cat) => (
            <button
              key={cat}
              className="inline-flex items-center px-4 py-2 text-white transition rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 whitespace-nowrap"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
