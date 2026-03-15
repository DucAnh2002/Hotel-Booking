const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    userId: {
      type: String,
      required: true, // lấy từ req.user.sub
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room", // ⚠ Cho phép populate roomId
      required: true,
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    guests: {
      type: Number,
      default: 1,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    transactionId: {
      type: String,
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "stripe", "bank_transfer"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
