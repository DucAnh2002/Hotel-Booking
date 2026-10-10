const Booking = require("../models/bookingModel");
const Order = require("../models/orderModel");

exports.getDashboardStats = async (req, res) => {
  try {
    // 1. Tính tổng doanh thu đặt phòng và F&B
    const roomRevenue = await Booking.aggregate([
      { $match: { status: "CONFIRMED" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const foodRevenue = await Order.aggregate([
      { $match: { status: "COMPLETED" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    // 2. Thống kê tình trạng phòng
    // (viết query đếm phòng đang ở, trống, bảo trì,...)

    res.status(200).json({
      success: true,
      data: {
        totalRevenue:
          (roomRevenue[0]?.total || 0) + (foodRevenue[0]?.total || 0),
        roomRevenue: roomRevenue[0]?.total || 0,
        foodRevenue: foodRevenue[0]?.total || 0,
        // roomStatusStats: {...}
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thống kê dashboard",
      error: error.message,
    });
  }
};
