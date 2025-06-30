const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const foodRoutes = require("./routes/foodRoutes");
const hotelRoutes = require("./routes/hotelRoutes");

// app config
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/food", foodRoutes);
app.use("/api/hotel", hotelRoutes);

app.get("/", (req, res) => {
  res.send("Hello from server");
});
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(5000, () =>
      console.log("🚀 Server running on http://localhost:5000")
    );
  })
  .catch((err) => console.error("❌ MongoDB error:", err));
