import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchSearchData } from "../../data/SearchData/searchData";

function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);

  // Fetch location suggestions from search data
  const fetchLocationSuggestions = async (query) => {
    try {
      setIsLoadingSuggestions(true);
      const response = await fetchSearchData("", query);
      if (response && response.results) {
        const uniqueLocations = new Set();
        const locationSuggestions = response.results
          .map((result) => {
            const { city, state } = result.location;
            return city && state ? `${city}, ${state}` : null;
          })
          .filter(
            (loc) =>
              loc &&
              !uniqueLocations.has(loc) &&
              loc.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 5);
        uniqueLocations.clear();
        setSuggestions(locationSuggestions);
      } else {
        setSuggestions([]);
        console.warn("No results found in search data for suggestions");
      }
    } catch (error) {
      console.error("Error fetching location suggestions:", error.message);
      setSuggestions([]);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    if (value.length > 1) {
      fetchLocationSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (value) => {
    setLocation(value);
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Search Term:", searchTerm);
    console.log("Location:", location);
    try {
      setIsLoadingSearch(true);
      setSearchResults([]); // Clear previous results on submit
      const data = await fetchSearchData(searchTerm, location);
      console.log("Received Data:", data);
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Search failed:", error.message);
      setSearchResults([]);
    } finally {
      setIsLoadingSearch(false);
    }
  };

  const handleBusinessClick = (businessId) => {
    navigate(`/categories/health/store/${businessId}`);
  };

  // Handle click outside to clear results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setSearchResults([]);
        setSuggestions([]);
        console.log("Cleared results and suggestions due to outside click");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-5/6 mx-auto" ref={formRef}>
      <form
        className="flex items-center justify-between w-full px-2 py-2 bg-white rounded-lg shadow-sm"
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
            placeholder="Enter the city"
            className="w-full h-12 px-2 text-gray-700 bg-transparent border-none outline-none"
            value={location}
            onChange={handleLocationChange}
          />
          {isLoadingSuggestions ? (
            <div className="absolute z-10 p-2 mt-1 text-sm text-gray-600 bg-white border border-gray-200 rounded shadow top-full left-10">
              Loading...
            </div>
          ) : suggestions.length > 0 ? (
            <ul className="absolute right-0 z-10 mt-1 overflow-y-auto bg-white border border-gray-200 rounded shadow top-full left-10 max-h-24 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
              {suggestions.map((city, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(city)}
                  className="py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                >
                  {city}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="h-12 px-6 font-semibold text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
          disabled={isLoadingSearch}
        >
          {isLoadingSearch ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Business Results List */}
      {isLoadingSearch ? (
        <div className="w-full p-2 mx-auto mt-2 text-center text-gray-600">
          Searching...
        </div>
      ) : searchResults.length > 0 ? (
        <ul className="absolute left-0 w-full mx-auto mt-1 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-md top-full max-h-54 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {searchResults.map((business) => (
            <li
              key={business._id}
              onClick={() => handleBusinessClick(business._id)}
              className="flex items-center p-2 pl-3 transition-colors duration-200 cursor-pointer hover:bg-gray-50"
            >
              {business.profileImage ? (
                <img
                  src={`http://localhost:5000/${business.profileImage}`}
                  alt={`${business.name} profile`}
                  className="object-cover w-12 h-12 mr-3 rounded-full"
                />
              ) : (
                <div className="flex items-center justify-center w-12 h-12 mr-3 bg-gray-200 rounded-full">
                  <span className="text-gray-500"></span>
                </div>
              )}
              <div>
                <h4 className="text-sm font-medium text-gray-800">
                  {business.name}
                </h4>
                <p className="text-xs text-left text-gray-600">
                  {business.location.city}, {business.location.state}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default SearchForm;
