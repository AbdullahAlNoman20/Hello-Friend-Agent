import { useState } from "react";
import axios from "axios";
import Products from "../Components/Products";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    hashtags: "", // Comma separated
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      desc: formData.desc,
      hashtags: formData.hashtags.split(",").map((tag) => tag.trim()),
    };

    try {
      const res = await axios.post("http://localhost:5000/api/products", payload);
      alert("Product added!");
      setFormData({ title: "", desc: "", hashtags: "" });
    } catch (err) {
      console.error(err);
      alert("Error adding product.");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="desc"
          placeholder="Description"
          value={formData.desc}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="hashtags"
          placeholder="Hashtags (comma-separated)"
          value={formData.hashtags}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
