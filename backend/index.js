const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());


app.post('/send-alert', async (req, res) => {
  try {
    const { message } = req.body;

    // Send to Relay webhook
    await axios.post(process.env.RELAY_WEBHOOK_URL, {
      message: message || "Default Alert from Node App"
    });

    res.status(200).send({ success: true, message: 'Relay triggered' });
  } catch (error) {
    console.error("Relay Error:", error.response?.data || error.message);
    res.status(500).send({ success: false, error: 'Relay trigger failed' });
  }
});

// Routes
const chatRoutes = require("./routes/chatRoutes");
app.use("/", chatRoutes);

// Start server
app.listen(PORT, () => console.log(`🟢 Server running on http://localhost:${PORT}`));