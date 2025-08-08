const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/send-alert", async (req, res) => {
  try {
    const { message } = req.body;
    const webhookUrl = process.env.RELAY_WEBHOOK_URL;

    if (!webhookUrl) {
      return res
        .status(500)
        .send({ success: false, error: "Webhook URL not configured" });
    }

    const url = new URL(webhookUrl);
    const postData = JSON.stringify({
      message: message || "Default Alert from Node App",
    });

    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === "https:" ? 443 : 80),
      path: url.pathname + url.search,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const request = (url.protocol === "https:" ? https : http).request(
      options,
      (response) => {
        let data = "";
        response.on("data", (chunk) => (data += chunk));
        response.on("end", () => {
          res.status(200).send({ success: true, message: "Relay triggered" });
        });
      }
    );

    request.on("error", (error) => {
      console.error("Relay Error:", error.message);
      res.status(500).send({ success: false, error: "Relay trigger failed" });
    });

    request.write(postData);
    request.end();
  } catch (error) {
    console.error("Relay Error:", error.message);
    res.status(500).send({ success: false, error: "Relay trigger failed" });
  }
});

// Routes
const chatRoutes = require("./routes/chatRoutes");
app.use("/", chatRoutes);

app.use("/api/auth", require("./routes/auth"));

//mongodb connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/AIchat")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Error handling
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
app.listen(PORT, () =>
  console.log(`🟢 Server running on http://localhost:${PORT}`)
);
