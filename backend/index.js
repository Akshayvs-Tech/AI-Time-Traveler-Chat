const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const chatRoutes = require("./routes/chatRoutes");
app.use("/", chatRoutes);

// Start server

app.listen(PORT, () => console.log(`🟢 Server running on http://localhost:${PORT}`));