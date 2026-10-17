const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    auth0Id: { type: String, unique: true, sparse: true }, // Id định danh của Auth0
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    role: {
      type: String,
      enum: ["admin", "manager", "reception", "kitchen", "customer"],
      default: "customer",
    },
    phoneNumber: { type: String, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
