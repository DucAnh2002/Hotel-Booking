const Booking = require("../models/bookingModel");
const Order = require("../models/orderModel");
const Room = require("../models/roomModel");

exports.getOverviewStats = async () => {
  const startOfDay = new Date();
  startOfDay.setFullYear(0, 0, 0, 0);

  // 1. Tính tổng doanh thu hôm nay
  const [bookingRev, foodRev] = await Promise.all([
    Booking.aggregate([
      { $match: { createdAt: { $gte: startOfDay }, status: "CONFIRMED" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]),

    Order.aggregate([
      { $match: { createdAt: { $gte: startOfDay }, status: "COMPLETED" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]),
  ]);

  const todayRevenue = (bookingRev[0]?.total || 0) + (foodRev[0]?.total || 0);

  // 2. Thống kê tình trạng phòng
  const rooms = await Room.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const roomSummary = {
    OCCUPIED: 0,
    AVAILABLE: 0,
    CLEANING: 0,
    MAINTENANCE: 0,
  };
  rooms.forEach((r) => {
    if (roomSummary[r._id] !== undefined) roomSummary[r._id] = r.count;
  });

  // 3. Thống kê số lượng đơn
  const todayBookingsCount = await Booking.countDocuments({
    createdAt: { $gte: startOfDay },
  });
  const todayOrdersCount = await Order.countDocuments({
    createdAt: { $gte: startOfDay },
  });

  return {
    todayRevenue,
    todayBookingsCount,
    todayOrdersCount,
    roomSummary,
  };
};
