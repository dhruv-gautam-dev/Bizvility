import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";

function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  // console.log("Search Term:", searchTerm);
  // console.log("Location:", location);

  return (
    <form
      className="flex items-center justify-between w-4/5 px-2 py-2 mx-auto bg-white rounded-lg shadow-sm"
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
  );
}
export default SearchForm;
