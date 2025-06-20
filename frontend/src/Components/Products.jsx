import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Fetch products from the backend API
  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

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
    <div className="py-12 px-6 md:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">Loading products...</p>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300 group"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 group-hover:text-green-600 transition">
                {product.title}
              </h2>
              <p className="text-gray-600 mb-4">{product.desc}</p>
              <button
                onClick={() => openDialog(product)}
                className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Details
              </button>
            </div>
          </div>
        ))
      )}

      {/* 🪟 Dialog Box */}
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

export default Products;
