const mongoose = require("mongoose");

const amenitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["SPA", "TRANSPORT", "GYM", "OTHER"],
      default: "SPA",
    },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, defaultL: "" },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Amenity", amenitySchema);
