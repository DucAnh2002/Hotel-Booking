const Booking = require("../models/bookingModel");
const Order = require("../models/foodModel");
const Room = require("../models/roomModel");
const sendEmail = require("../utils/sendEmail");
const bookingEmailTemplate = require("../utils/emailTemplate");
const axios = require("axios");

// lấy email user từ Auth0
const getUserEmail = async (token) => {
  try {
    const response = await axios.get(
      "https://dev-nw1rm8udcnlm6ta2.us.auth0.com/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.email;
  } catch (error) {
    console.error("❌ Lỗi khi lấy email user:", error);
    throw new Error("Không thể lấy email user");
  }
};

const bookRoom = async (req, res) => {
  console.log("HEADERS:", req.headers);
  console.log("USER CHECK", req.auth);

  try {
    const userId = req.auth.sub;

    // lấy email user từ Auth0
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const userEmail = await getUserEmail(token);

    console.log("USER EMAIL:", userEmail);

    const {
      roomId,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice,
      paymentMethod,
    } = req.body;

    if (!roomId || !checkInDate || !checkOutDate) {
      return res.status(400).json({
        message: "Vui lòng cung cấp roomId",
      });
    }

    // kiểm tra logic ngày
    const inDate = new Date(checkInDate);
    const outDate = new Date(checkOutDate);

    if (isNaN(inDate) || isNaN(outDate)) {
      return res.status(400).json({
        message: "Ngày không hợp lệ",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    inDate.setHours(0, 0, 0, 0);
    outDate.setHours(0, 0, 0, 0);

    if (inDate < today) {
      return res.status(400).json({
        message: "Ngày nhận phòng phải từ hôm nay trở đi",
      });
    }

    if (inDate >= outDate) {
      return res.status(400).json({
        message: "Ngày trả phòng phải sau ngày nhận phòng",
      });
    }

    // kiểm tra user đã đặt phòng chưa
    const existingBooking = await Booking.findOne({
      userId,
      roomId,
      checkInDate: inDate,
      checkOutDate: outDate,
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "Bạn đã đặt phòng này trong khoảng thời gian này rồi!",
      });
    }

    // lấy thông tin room (để gửi email)
    const room = await Room.findById(roomId);
    console.log("ROOM DATA:", room);
    if (!room) {
      return res.status(404).json({
        message: "Không tìm thấy phòng",
      });
    }

    // tạo booking
    const booking = new Booking({
      userId,
      roomId,
      checkInDate: inDate,
      checkOutDate: outDate,
      guests,
      totalPrice,
      paymentMethod,
    });

    await booking.save();

    console.log("✅ Booking saved:", booking._id);

    // gửi email xác nhận booking
    try {
      console.log(" Sending booking email to:", userEmail);

      const imageUrl = `${process.env.SERVER_URL}/upload/rooms/${room.image}`;
      console.log(" DATA EMAIL:", {
        bookingId: booking._id,
        roomName: room.roomType,
        roomImage: imageUrl,
        checkInDate,
        checkOutDate,
        guests,
        totalPrice,
        paymentMethod,
      });
      const html = bookingEmailTemplate({
        bookingId: booking._id.toString(),
        roomName: room.roomType,
        roomImage: imageUrl,
        checkInDate,
        checkOutDate,
        guests,
        totalPrice,
        paymentMethod,
      });
      await sendEmail(userEmail, "Your booking is confirmed", html);

      console.log(" Email sent successfully");
    } catch (emailError) {
      console.error("❌ Lỗi gửi email:", emailError);
    }

    res.status(200).json({
      success: true,
      message: "✅ Đặt phòng thành công!",
    });
  } catch (err) {
    console.error("❌ Lỗi khi đặt phòng:", err);

    res.status(500).json({
      success: false,
      message: "Lỗi khi đặt phòng",
    });
  }
};

// REMOVE BOOKING
const removeFromBookings = async (req, res) => {
  try {
    const userId = req.auth.sub;
    const { bookingId } = req.params;

    if (!bookingId) {
      return res.status(400).json({
        message: "bạn chưa đặt phòng nào!",
      });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "không tìm thấy booking!",
      });
    }

    await Booking.findByIdAndDelete(bookingId);

    res.status(200).json({
      success: true,
      message: "Đã hủy đặt phòng!",
    });
  } catch (error) {
    console.error("❌ Lỗi khi hủy booking:", error);

    res.status(500).json({
      success: false,
      message: "Lỗi khi hủy booking",
    });
  }
};

// Lấy danh sách phòng đã đặt của user
const getMyBookings = async (req, res) => {
  try {
    const userId = req.auth.sub;

    const bookings = await Booking.find({ userId }).populate("roomId");

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (err) {
    console.error("❌ Lỗi khi lấy danh sách phòng đã đặt:", err);

    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách phòng đã đặt",
    });
  }
};

// Admin: lấy tất cả booking
const listAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("roomId");

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách booking:", error);

    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy danh sách booking",
    });
  }
};

// Admin: lấy tất cả order đồ ăn
const ListAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách order:", error);

    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy danh sách tất cả order",
    });
  }
};

module.exports = {
  bookRoom,
  getMyBookings,
  removeFromBookings,
  listAllBookings,
  ListAllOrders,
};
