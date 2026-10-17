const { getIO } = require("../config/socket");

exports.notifyNewBooking = (booking) => {
  try {
    const io = getIO();
    io.to("reception").emit("NEW_BOOKING_ALERT", {
      message:
        "Có đơn đặt phòng mới từ khách:" + (booking.guestName || "Khách mới"),
      booking,
      createAt: new Date(),
    });
  } catch (err) {
    console.error("❌ Lỗi khi gửi thông báo đặt phòng mới:", err.message);
  }
};

exports.notifyNewFoodOrder = (order) => {
  try {
    const io = getIO();
    io.to("kitchen").emit("NEW_FOOD_ORDER", {
      message:
        "Có đơn đặt món mới từ khách:" + (order.guestName || "Khách mới"),
      order,
      createAt: new Date(),
    });
  } catch (err) {
    console.error("❌ Lỗi khi gửi thông báo đặt món mới:", err.message);
  }
};

exports.notifyOrderStatusUpdate = (order) => {
  try {
    const io = getIO();
    // bắn sự kiện về cho User đang mở phòng đó
    io.to(`room_${order.roomId}`).emit("CLIENT_ORDER_STATUS_CHANGED", {
      orderId: order._id,
      status: order.status,
      updateAt: new Date(),
    });
  } catch (err) {
    console.error(
      "❌ Lỗi khi gửi thông báo cập nhật trạng thái đơn hàng:",
      err.message,
    );
  }
};
