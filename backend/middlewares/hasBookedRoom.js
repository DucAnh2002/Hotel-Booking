const Booking = require("../models/bookingModel.js");

const hasBookedRoom = async (req, res, next) => {
  const userId = res.user?.sub; //Lấy userId từ token đã xác thực
  if (!userId) {
    return res.status(401).json({ message: "Chưa đăng nhập" });
  }
  const booking = await Booking.findOne({ userId });
  if (!booking) {
    return res
      .status(403)
      .json({ message: "Bạn cần đặt phòng trước khi gọi món" });
  }
  next(); //Cho phép tiếp tục nếu đã đặt phòng
};

module.exports = hasBookedRoom;
// Đoạn middleware này sẽ kiểm tra xem người dùng đã đặt phòng hay chưa
// Nếu chưa đặt phòng, sẽ trả về lỗi 403 với thông báo yêu cầu đặt phòng
// Nếu đã đặt phòng, sẽ cho phép tiếp tục xử lý yêu cầu
