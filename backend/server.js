const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const foodRoutes = require("./routes/foodRoutes");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const paymentRoutes = require("./routes/paymentRoutes");
// app config
const app = express();
const allowedOrigins = [
  "http://localhost:5174", // admin local
  "http://localhost:5173", // home local
  "https://hotel-booking-admin-blush.vercel.app", // admin
  "https://hotel-booking-lac-seven.vercel.app", // home
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());

// Routes
app.use("/api/food", foodRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/payment", paymentRoutes);
// Static files
app.use("/upload", express.static(path.join(__dirname, "upload")));
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
