import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";
import SearchForm from "../layout/SearchForm";
import bgImg from "../../assets/images/homeImages/HeroImage.webp";

function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src={bgImg}
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full"
      />
      {/* Blue overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.3) 0%,    /* light whiteish at top */
      rgba(0, 0, 0, 0.5)   40%,       /* soft transition to darker */
      rgba(0, 0, 0, 0.6)   80%,       /* darker mid-lower section */
      rgba(0, 0, 0, 0.9)   100%       /* darkest near bottom */
    )`,
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
        <SearchForm />

        {/* Categories */}
        {/* <div className="flex flex-wrap justify-center gap-4 mt-4">
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
        </div> */}
      </div>
    </section>
  );
}

export default Hero;
