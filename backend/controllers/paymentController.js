const Booking = require("../models/bookingModel");
const sendEmail = require("../utils/sendEmail");
const { v4: uuidv4 } = require("uuid");

// Tạo payment
exports.createPayment = async (req, res) => {
  try {
    const {
      roomId,
      checkInDate,
      checkOutDate,
      totalPrice,
      paymentMethod,
      userEmail,
    } = req.body;

    const userId = req.auth.sub;

    if (paymentMethod === "bank_transfer") {
      const booking = await Booking.create({
        userId,
        roomId,
        checkInDate,
        checkOutDate,
        totalPrice,
        paymentMethod,
        paymentStatus: "pending",
      });

      const redirectUrl =
        `${process.env.CLIENT_URL}/mock-bank` +
        `?bookingId=${booking._id}` +
        `&amount=${totalPrice}` +
        `&email=${userEmail}`;

      return res.json({ redirectUrl });
    }

    res.status(400).json({
      message: "Unsupported method",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.bankCallback = async (req, res) => {
  try {
    const { bookingId, status, email } = req.query;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).send("Booking not found");
    }

    if (status === "success") {
      const transactionId = uuidv4();

      booking.paymentStatus = "paid";
      booking.transactionId = transactionId;

      await booking.save();

      await sendEmail(
        email,
        "Thanh toán thành công",
        `
Bạn đã thanh toán thành công.
Booking ID: ${booking._id}
Transaction: ${transactionId}
`,
      );

      return res.redirect(`${process.env.CLIENT_URL}/payment-success`);
    }

    booking.paymentStatus = "failed";
    await booking.save();

    res.redirect(`${process.env.CLIENT_URL}/payment-fail`);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
