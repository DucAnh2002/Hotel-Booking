const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: { type: String, default: "food" },
  image: String,
});

module.exports = mongoose.model("Food", foodSchema);
