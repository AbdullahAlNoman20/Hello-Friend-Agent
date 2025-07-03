// ✅ Updated Products.jsx with Padding, Image Fallback, Delete & Update Buttons, Confirmation & Modal

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const limit = 5;

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/products?page=${page}&limit=${limit}`);
      setProducts(res.data.products);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const openDialog = (product) => {
    setSelectedProduct(product);
    setActiveImageIndex(0);
  };

  const closeDialog = () => setSelectedProduct(null);

  const nextImage = () => setActiveImageIndex((prev) => (prev + 1) % selectedProduct.images.length);

  const prevImage = () => setActiveImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setShowConfirm(false);
      fetchProducts(page);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/products/${editingProduct.id}`, editingProduct);
      setEditingProduct(null);
      fetchProducts(page);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="px-6 md:px-16">
      {/* <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Our Products</h1> */}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="border-4 border-green-600 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-xl overflow-hidden shadow hover:shadow-lg hover:border-green-600 transition duration-300 group p-4"
            >
              <img
                src={product.images[0] || "https://i.ibb.co/B5LMRbRX/Sample-Image.webp"}
                onError={(e) => (e.target.src = "https://i.ibb.co/B5LMRbRX/Sample-Image.webp")}
                alt={product.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 rounded"
              />
              <h2 className="text-xl font-semibold mt-2 text-green-700">{product.title}</h2>
              <p className="text-gray-600 mb-2 text-sm">{product.desc}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <button onClick={() => openDialog(product)} className="text-white bg-green-600 px-3 py-1 rounded hover:bg-green-700">Details</button>
                <button onClick={() => {
                  setProductToDelete(product.id);
                  setShowConfirm(true);
                }} className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600">Delete</button>
                <button onClick={() => setEditingProduct(product)} className="text-white bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600">Update</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded bg-green-100 hover:bg-green-200 disabled:opacity-50"
        >Prev</button>
        <span className="text-gray-700">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 border rounded bg-green-100 hover:bg-green-200 disabled:opacity-50"
        >Next</button>
      </div>

      {/* Confirm Delete Popup */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this product?</p>
            <div className="flex justify-around">
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={() => handleDelete(productToDelete)} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] md:w-[600px]">
            <h2 className="text-2xl font-bold mb-4">Update Product</h2>
            <input
              type="text"
              value={editingProduct.title}
              onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
              className="w-full border p-2 mb-4 rounded"
              placeholder="Product Name"
            />
            <textarea
              value={editingProduct.desc}
              onChange={(e) => setEditingProduct({ ...editingProduct, desc: e.target.value })}
              className="w-full border p-2 mb-4 rounded"
              placeholder="Description"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setEditingProduct(null)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleUpdate} className="px-4 py-2 bg-green-600 text-white rounded">Update</button>
            </div>
          </div>
        </div>
      )}

      {/* Dialog */}
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
              <p className="text-gray-700 mb-4">{selectedProduct.desc}</p>
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <p><strong>Price:</strong> {selectedProduct.price}</p>
                <p><strong>Stock:</strong> {selectedProduct.stock}</p>
                <p><strong>Group:</strong> {selectedProduct.group}</p>
                <p><strong>Item:</strong> {selectedProduct.item}</p>
                <p><strong>Color:</strong> {selectedProduct.color}</p>
                <p><strong>Size:</strong> {selectedProduct.size}</p>
                <p><strong>Fit:</strong> {selectedProduct.fit}</p>
                <p><strong>Fabric:</strong> {selectedProduct.fabric}</p>
              </div>
              <a
                href={selectedProduct.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 mb-4 inline-block"
              >
                Visit Product Page ↗
              </a>
              <p className="text-gray-500 text-xs mb-2"><strong>User Query:</strong> {selectedProduct.user_query}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProduct.hashtags?.map((tag, idx) => (
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

export default Products;
