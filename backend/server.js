const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const foodRoutes = require("./routes/foodRoutes");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
// app config
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/food", foodRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/booking", bookingRoutes);
// Static files
app.use("/upload", express.static("upload"));

app.get("/", (req, res) => {
  res.send("Hello from server");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then((conn) => {
    console.log("✅ Connected to MongoDB", conn.connection.name);
    app.listen(5000, () =>
      console.log("🚀 Server running on http://localhost:5000")
    );
  })
  .catch((err) => console.error("❌ MongoDB error:", err));
