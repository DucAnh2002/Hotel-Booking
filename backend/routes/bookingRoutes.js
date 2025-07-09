const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const checkJwt = require("../middlewares/checkJwt");
const {
  bookRoom,
  removeFromBookings,
  getMyBookings,
} = require("../controllers/bookingController");
//

router.post("/book-room", checkJwt, bookRoom);
router.get("/my-bookings", checkJwt, getMyBookings);
router.delete("/remove/:bookingId", checkJwt, removeFromBookings);
module.exports = router;
