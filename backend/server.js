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


// Schema with original raw keys from your data
const productSchema = new mongoose.Schema({}, { strict: false });
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

// ✅ API with Pagination + Mapping
app.get("/api/products", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const rawData = await Products.find().skip(skip).limit(limit);
    const total = await Products.countDocuments();

    // 🔄 Map raw MongoDB data to frontend-friendly format
    const products = rawData.map((item) => ({
  id: item._id,
  title: item["Product Name"],
  desc: item.user_query,
  price: item.Price,
  stock: item.Availability,
  group: item.Group,
  item: item.Item,
  color: item.Color,
  size: item.Size,
  fit: item.Fit,
  fabric: item.Fabric,
  link: item.Link,
  user_query: item.user_query,
  hashtags: (() => {
    try {
      return item.Hashtags
        ? JSON.parse(item.Hashtags.replace(/'/g, '"'))
        : [];
    } catch {
      return [];
    }
  })(),
  images: [
    `https://source.unsplash.com/featured/?${item.Item},${item.Color}`
  ]
}));

    res.status(200).json({ products, total });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Search Products by Hashtag — supports stringified array
app.get("/api/products/search", async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ message: "Missing search query" });

  try {
    const regex = new RegExp(`['\"]${query}['\"]`, "i"); // Match tag inside stringified array
    const results = await Products.find({
      Hashtags: { $regex: regex }
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Search error", error: err.message });
  }
});

// ✅ Return all hashtags for suggestion
app.get("/api/products/hashtags", async (req, res) => {
  try {
    const products = await Products.find({}, { Hashtags: 1 });
    const allTags = new Set();

    products.forEach((prod) => {
      try {
        const tags = JSON.parse(prod.Hashtags.replace(/'/g, '"'));
        tags.forEach((tag) => allTags.add(tag));
      } catch (err) {
        // silently skip invalid format
      }
    });

    res.json([...allTags]);
  } catch (err) {
    res.status(500).json({ message: "Failed to load hashtags", error: err.message });
  }
});


// 🔄 DELETE product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const result = await Products.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Deleted successfully", result });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
});

// 🔁 UPDATE product
app.put("/api/products/:id", async (req, res) => {
  try {
    const updateData = req.body;
    const result = await Products.updateOne({ _id: req.params.id }, { $set: updateData });
    res.status(200).json({ message: "Updated successfully", result });
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err.message });
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
