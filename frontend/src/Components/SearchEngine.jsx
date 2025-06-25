import React, { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

const SearchEngine = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleSearch = async () => {
    if (query.trim()) {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/search?query=${query}`);
        setResults(res.data);
        setSearchClicked(true);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
        setSearchClicked(true);
      }
    }
  };

  const openDialog = (product) => {
    setSelectedProduct(product);
    setActiveImageIndex(0);
  };

  const closeDialog = () => setSelectedProduct(null);

  const nextImage = () => {
    setActiveImageIndex((prev) =>
      (prev + 1) % selectedProduct.images.length
    );
  };

  const prevImage = () => {
    setActiveImageIndex((prev) =>
      (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mx-4 md:mx-16 -mt-10 relative z-10">
      <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
        🔍 Search Engine
      </h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Type to search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSearchClicked(false);
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

      {searchClicked && (
        <div className="mt-6">
          {results.length === 0 ? (
            <p className="text-center text-red-600 font-medium">
              No result found — this system is under maintenance 🚧
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {results.map((product) => (
                <div
                  key={product._id}
                  className="border p-4 rounded-md shadow hover:shadow-lg transition bg-white group"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-40 object-cover mb-2 rounded group-hover:scale-105 transition"
                  />
                  <h3 className="text-xl font-semibold group-hover:text-green-600">
                    {product.title}
                  </h3>
                  <p className="text-gray-600">{product.desc}</p>
                  <p className="text-sm mt-2 text-green-700 font-semibold">
                    #{product.hashtags.join(" #")}
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
      )}

      {/* 🪟 Product Detail Dialog */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl relative">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-2xl font-semibold">
                {selectedProduct.title}
              </h2>
              <button
                onClick={closeDialog}
                className="text-red-600 hover:text-red-800 text-xl"
              >
                <FaTimes />
              </button>
            </div>

            {/* Body */}
            <div className="p-4">
              <p className="text-gray-700 mb-4">{selectedProduct.desc}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <p><strong>Price:</strong> {selectedProduct.price}</p>
                <p><strong>Duration:</strong> {selectedProduct.duration}</p>
                <p><strong>Stock:</strong> {selectedProduct.stock}</p>
              </div>

              {/* Image Slider */}
              <div className="relative mb-4">
                <img
                  src={selectedProduct.images[activeImageIndex]}
                  alt="Product Slide"
                  className="w-full h-56 object-cover rounded-md"
                />
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow"
                >
                  ◀
                </button>
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow"
                >
                  ▶
                </button>
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
