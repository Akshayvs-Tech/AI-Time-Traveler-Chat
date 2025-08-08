const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Add this import
require("dotenv").config();

const app = express();

// CORS Configuration - Add this BEFORE other middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // Add your frontend URLs
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const chatRoutes = require("./routes/chatRoutes");

// Option A: Keep /api prefix and update frontend
app.use("/api", chatRoutes); // This makes the route /api/chat

// Option B: Remove /api prefix to match your frontend
// app.use("/", chatRoutes); // This makes the route just /chat

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Test route to verify server is working
app.get("/", (req, res) => {
  res.json({ message: "AI Time Traveler Chat API is running!" });
});

// MongoDB connection
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/ai-time-traveler",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});