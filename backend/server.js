const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// 🔥 Inline Product Schema
const productSchema = new mongoose.Schema({
  title: String,
  desc: String,
  price: String,
  duration: String,
  stock: String,
  images: [String]
});

const Products = mongoose.model("Products", productSchema);

// Sample route
app.get("/", (req, res) => {
  res.send("API Running");
});

// ✅ API to Get Products from Database
app.get("/api/products", async (req, res) => {
  try {
    const products = await Products.find(); // Get all products
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on Port: ${PORT}`);
});
