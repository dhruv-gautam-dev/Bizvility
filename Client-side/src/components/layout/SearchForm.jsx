import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";
import axios from "axios";

function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // ✅ Fetch city suggestions from GeoNames
  const fetchCitySuggestions = async (query) => {
    try {
      const response = await axios.get("http://api.geonames.org/searchJSON", {
        params: {
          name_startsWith: query,
          country: "IN",
          featureClass: "P",
          maxRows: 5,
          username: "dhruv0022", // ✅ Your activated username
        },
      });

      if (response.data && response.data.geonames) {
        const cities = response.data.geonames.map((place) => {
          return `${place.name}, ${place.adminName1}, ${place.countryName}`;
        });
        setSuggestions(cities);
      }
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    if (value.length > 1) fetchCitySuggestions(value);
    else setSuggestions([]);
  };

  const handleSuggestionClick = (value) => {
    setLocation(value);
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search Term:", searchTerm);
    console.log("Location:", location);
    // 👇 Call your search API here
    // fetchData({ keyword: searchTerm, location });
  };

  return (
    <form
      className="flex items-center justify-between w-4/5 px-2 py-2 mx-auto bg-white rounded-lg shadow-sm"
      onSubmit={handleSubmit}
    >
      {/* Business Keyword Input */}
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

      {/* Location Input with Suggestion Dropdown */}
      <div className="relative flex items-center flex-1 pl-2 mr-2 border-l border-gray-200">
        <MapPin className="w-5 h-5 mr-2 text-gray-400" />
        <input
          type="text"
          placeholder="Location"
          className="w-full h-12 px-2 text-gray-700 bg-transparent border-none outline-none"
          value={location}
          onChange={handleLocationChange}
        />
        {suggestions.length > 0 && (
          <ul className="absolute right-0 z-10 mt-1 overflow-y-auto bg-white border border-gray-200 rounded shadow top-full left-10 max-h-48">
            {suggestions.map((city, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(city)}
                className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="h-12 px-6 font-semibold text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}

export default SearchForm;
