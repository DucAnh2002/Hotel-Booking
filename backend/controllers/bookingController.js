const Booking = require("../models/bookingModel");

const bookRoom = async (req, res) => {
  console.log("HEADERS:", req.headers);
  console.log("USER CHECK", req.auth);
  try {
    const userId = req.auth.sub;
    console.log("📥 HEADERS:", req.headers);
    console.log("📥 AUTH:", req.auth); // xác minh token đã giải mã ra user chưa
    console.log("USER ID:", userId);
    const { roomId, checkInDate, checkOutDate, guests } = req.body;

    if (!roomId || !checkInDate || !checkOutDate)
      return res.status(400).json({ message: "Vui lòng cung cấp roomId" });

    // Kiểm tra logic ngày
    const inDate = new Date(checkInDate);
    const outDate = new Date(checkOutDate);

    if (isNaN(inDate) || isNaN(outDate))
      return res.status(400).json({ message: "Ngày không hợp lệ" });

    if (inDate >= outDate) {
      return res
        .status(400)
        .json({ message: "Ngày nhận phòng phải trước ngày trả phòng" });
    }
    const existingBooking = await Booking.findOne({ userId, roomId });
    if (existingBooking) {
      return res.status(400).json({ message: "Bạn đã đặt phòng này rồi!" });
    }

    const booking = new Booking({
      userId,
      roomId,
      checkInDate,
      checkOutDate,
      guests,
      // bookingDate: new Date(),
    });
    await booking.save();

    res
      .status(200)
      .json({ success: true, message: "✅ Đặt phòng thành công!" });
  } catch (err) {
    console.error("❌ Lỗi khi đặt phòng:", err);
    res.status(500).json({ success: false, message: "Lỗi khi đặt phòng" });
  }
};

// remove room from user booking

const removeFromBookings = async (req, res) => {
  try {
    const userId = req.auth.sub;
    const { bookingId } = req.params;

    if (!bookingId) {
      return res.status(400).json({ message: "bạn chưa đặt phòng nào!" });
    }

    // kiểm tra booking có tồn tại và thuộc về user không ?
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "không tìm thấy booking!" });
    }
    await Booking.findByIdAndDelete(bookingId);
    res.status(200).json({ success: true, message: "Đã hủy đặt phòng!" });
  } catch (error) {
    console.error("Lỗi khi hủy, vui lòng thử lại sau!");
  }
};

// Lấy danh sách phòng đã đặt của người dùng
const getMyBookings = async (req, res) => {
  console.log("📥 HEADERS:", req.headers);
  console.log("📥 AUTH:", req.auth); // xác minh token đã giải mã ra user chưa
  try {
    const userId = req.auth.sub;
    const bookings = await Booking.find({ userId }).populate("roomId");
    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    console.error("❌ Lỗi khi lấy danh sách phòng đã đặt:", err);
    res
      .status(500)
      .json({ success: false, message: "Lỗi khi lấy danh sách phòng đã đặt" });
  }
};

module.exports = { bookRoom, getMyBookings, removeFromBookings };
