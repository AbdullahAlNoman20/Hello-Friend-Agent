// ✅ Updated SearchEngine with Hashtag-Based Live Suggestions + Auto Search

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

const SearchEngine = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [allHashtags, setAllHashtags] = useState([]);

  // Fetch all unique hashtags initially
  useEffect(() => {
    const fetchAllHashtags = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/hashtags");
        setAllHashtags(res.data);
      } catch (err) {
        console.error("Error fetching hashtags:", err);
      }
    };
    fetchAllHashtags();
  }, []);

  const parseHashtags = (str) => {
  try {
    return JSON.parse(str?.replace(/'/g, '"'));
  } catch {
    return [];
  }
};

  // Auto search when query changes
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        handleSearch();
      } else {
        setResults([]);
      }
    }, 400);

    // Auto-suggest filtering
    if (query.trim()) {
      const filtered = allHashtags.filter((tag) =>
        tag.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/products/search?query=${query}`);
      setResults(res.data);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    }
  };

  const openDialog = (product) => {
    setSelectedProduct(product);
    setActiveImageIndex(0);
  };

  const closeDialog = () => setSelectedProduct(null);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % selectedProduct.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mx-4 md:mx-16 -mt-10 relative z-10">
      <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">🔍 Smart Search Engine</h2>

      <div className="flex flex-col sm:flex-row gap-4 relative">
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder="Type to search by hashtag..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-green-500"
          />
          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 top-full bg-white border mt-1 rounded-md shadow z-20">
              {suggestions.map((tag, index) => (
                <li
                  key={index}
                  onClick={() => setQuery(tag)}
                  className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
        >
          Search
        </button>
      </div>

      <div className="mt-6">
        {results.length === 0 && query.trim() ? (
          <p className="text-center text-red-600 font-medium mt-4">
            No result found — try a different hashtag 🚧
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {results.map((product) => (
              <div
  key={product._id}
  className="border p-4 rounded-md shadow hover:shadow-lg transition bg-white group"
>
  <img
    src={(product.images && product.images[0]) || "https://i.ibb.co/B5LMRbRX/Sample-Image.webp"}
    onError={(e) => (e.target.src = "https://i.ibb.co/B5LMRbRX/Sample-Image.webp")}
    alt={product["Product Name"]}
    className="w-full h-40 object-cover mb-2 rounded group-hover:scale-105 transition"
  />
  <h3 className="text-xl font-semibold group-hover:text-green-600">
    {product["Product Name"]}
  </h3>
  <p className="text-gray-600 text-sm mb-2">{product.Item} for {product.Group}</p>
  <p className="text-sm text-green-800 mb-2">Price: {product.Price}</p>
  <p className="text-sm text-gray-700 mb-2">Color: {product.Color} | Size: {product.Size}</p>
  <p className="text-sm text-gray-500 mb-2">Availability: {product.Availability}</p>
  <p className="text-xs text-green-700 font-semibold break-words mb-2">
    #{parseHashtags(product.Hashtags).join(" #")}
  </p>
  <button
    onClick={() => openDialog(product)}
    className="mt-3 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
  >
    Details
  </button>
</div>
            ))}
          </div>
        )}
      </div>

      {/* 🪟 Product Detail Dialog */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl relative">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-2xl font-semibold">{selectedProduct.title}</h2>
              <button
                onClick={closeDialog}
                className="text-red-600 hover:text-red-800 text-xl"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-4">
  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
    <p><strong>Product Name:</strong> {selectedProduct["Product Name"]}</p>
    <p><strong>Group:</strong> {selectedProduct.Group}</p>
    <p><strong>Item:</strong> {selectedProduct.Item}</p>
    <p><strong>Availability:</strong> {selectedProduct.Availability}</p>
    <p><strong>Color:</strong> {selectedProduct.Color}</p>
    <p><strong>Size:</strong> {selectedProduct.Size}</p>
    <p><strong>Price:</strong> {selectedProduct.Price}</p>
    <p><strong>Fit:</strong> {selectedProduct.Fit}</p>
    <p><strong>Fabric:</strong> {selectedProduct.Fabric}</p>
  </div>

  <a
    href={selectedProduct.Link}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 underline hover:text-blue-800 mb-4 inline-block"
  >
    Visit Product Page ↗
  </a>

  <p className="text-gray-500 text-sm mb-2">
    <strong>User Query:</strong> {selectedProduct.user_query}
  </p>

  <div className="flex flex-wrap gap-2 mb-4">
    {parseHashtags(selectedProduct.Hashtags).map((tag, idx) => (
      <span key={idx} className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
        #{tag}
      </span>
    ))}
  </div>

  <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded">
    Add to Cart
  </button>
</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchEngine;
