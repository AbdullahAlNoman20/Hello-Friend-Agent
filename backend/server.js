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
  hashtags: [String],
   price: String,     
  duration: String,   
  stock: String,      
  images: [String],
});

const Products = mongoose.model("Products", productSchema);


// ✅ Add new POST route
app.post("/api/products", async (req, res) => {
  try {
    const newProduct = new Products(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: "Error creating product", error: err.message });
  }
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

// ✅ Search Products by Hashtag
app.get("/api/products/search", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Missing search query" });
  }

  try {
    const regex = new RegExp(query, "i"); // Case-insensitive regex match
    const results = await Products.find({ hashtags: { $in: [regex] } });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Search error", error: err.message });
  }
});




// Sample route
app.get("/", (req, res) => {
  res.send("API Running");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on Port: ${PORT}`);
});
