const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const foodRoutes = require("./routes/foodRoutes");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
// app config
const app = express();
app.use(
  cors({
    origin: [
      "https://hotel-booking-lac-seven.vercel.app/", // thay bằng URL thật
      "https://your-admin.vercel.app", // thay bằng URL thật
    ],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/food", foodRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/booking", bookingRoutes);
// Static files
app.use("/upload", express.static("upload"));

app.get("/", (req, res) => {
  res.send("Server is working!");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then((conn) => {
    console.log("✅ Connected to MongoDB", conn.connection.name);
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB error:", err));
