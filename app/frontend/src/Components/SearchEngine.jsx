// ✅ Enhanced SearchEngine with Modern UI, Hover, Animations, and Better UX

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

  // Fetch all unique hashtags
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

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) handleSearch();
      else setResults([]);
    }, 400);

    if (query.trim()) {
      const filtered = allHashtags.filter((tag) =>
        tag.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else setSuggestions([]);

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
  const nextImage = () => setActiveImageIndex((prev) => (prev + 1) % selectedProduct.images.length);
  const prevImage = () => setActiveImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length);

  return (
    <div className="bg-orange-50 shadow-xl rounded-xl p-6 mx-4 md:mx-16 -mt-10 relative z-10 animate-fadeIn">
      <h2 className="text-3xl font-bold text-center mb-6 text-orange-600">🔍 Explore with Smart Search</h2>

      <div className="flex flex-col sm:flex-row gap-4 relative">
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder="Search using #hashtags like #men, #shirt, #belt..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-orange-300 px-4 py-2 rounded-md shadow focus:ring-2 focus:ring-orange-400 outline-none"
            title="Type hashtag to search"
          />
          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 top-full bg-white border mt-1 rounded-md shadow z-20">
              {suggestions.map((tag, index) => (
                <li
                  key={index}
                  onClick={() => setQuery(tag)}
                  className="px-4 py-2 hover:bg-orange-100 cursor-pointer text-sm"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md shadow transition"
          title="Click to search"
        >
          Search
        </button>
      </div>

      <div className="mt-8">
        {results.length === 0 && query.trim() ? (
          <p className="text-center text-red-600 font-medium mt-4">
            No matching products found 🚧 Try a different hashtag.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {results.map((product) => (
              <div
                key={product._id}
                className="border border-orange-200 p-4 rounded-lg shadow-sm hover:shadow-lg transition bg-white group"
              >
                <img
                  src={(product.images && product.images[0]) || "https://i.ibb.co/B5LMRbRX/Sample-Image.webp"}
                  onError={(e) => (e.target.src = "https://i.ibb.co/B5LMRbRX/Sample-Image.webp")}
                  alt={product["Product Name"]}
                  className="w-full h-40 object-cover mb-2 rounded-md group-hover:scale-105 transition duration-300"
                />
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-orange-600">
                  {product["Product Name"]}
                </h3>
                <p className="text-gray-600 text-sm mb-1">{product.Item} for {product.Group}</p>
                <p className="text-sm text-orange-700 mb-1">Price: {product.Price}</p>
                <p className="text-sm text-gray-700 mb-1">Color: {product.Color} | Size: {product.Size}</p>
                <p className="text-sm text-gray-500 mb-2">Availability: {product.Availability}</p>
                <p className="text-xs text-green-700 font-semibold break-words mb-2">
                  #{parseHashtags(product.Hashtags).join(" #")}
                </p>
                <button
                  onClick={() => openDialog(product)}
                  className="mt-2 inline-block px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl relative animate-fadeIn">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-2xl font-bold text-orange-600">{selectedProduct["Product Name"]}</h2>
              <button
                onClick={closeDialog}
                className="text-red-600 hover:text-red-800 text-xl"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
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
                  <span key={idx} className="bg-orange-100 text-orange-700 text-xs font-medium px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>

              <button className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded">
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
