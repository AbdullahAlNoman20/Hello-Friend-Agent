import React, { useState } from "react";

const SearchEngine = () => {
  const [query, setQuery] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);

  const handleSearch = () => {
    if (query.trim()) {
      setSearchClicked(true);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mx-4 md:mx-16 -mt-10 relative z-10">
      <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
        🔍 Search Engine
      </h2>

      {/* Search Input and Button */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Type to search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSearchClicked(false); // Reset result when typing again
          }}
          className="flex-grow border px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSearch}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
        >
          Search
        </button>
      </div>

      {/* Search Result Message */}
      {searchClicked && (
        <p className="mt-6 text-center text-red-600 font-medium">
          No result found — this system is under maintenance 🚧
        </p>
      )}
    </div>
  );
};

export default SearchEngine;
