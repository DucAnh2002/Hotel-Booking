const Room = require("../models/roomModel");
// lấy danh sách tất cả phòng
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.json({ success: true, data: rooms });
  } catch (err) {
    console.error("❌ Lỗi khi lấy danh sách phòng:", err);
    res
      .status(500)
      .json({ success: false, message: "Không thể lấy danh sách phòng" });
  }
};
// thêm phòng mới vào hệ thống
const addRoom = async (req, res) => {
  try {
    const { roomType, rating, address, price, category } = req.body;
    const image = req.file.filename;

    const newRoom = new Room({
      roomType,
      rating,
      address,
      price,
      category,
      image,
    });
    await newRoom.save();

    res.json({ success: true, message: "Đã thêm phòng thành công!" });
  } catch (err) {
    console.error("❌ Room error:", err);
    res.status(500).json({ success: false, message: "Lỗi khi thêm phòng" });
  }
};

module.exports = { getAllRooms, addRoom };
