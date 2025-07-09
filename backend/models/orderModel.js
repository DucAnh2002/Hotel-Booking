const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    price: Number,
    quantity: Number,
    image: { type: String, required: true },
    deliveryDate: { type: Date, required: true },
    deliveryTime: { type: String, required: true },
    note: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
