const express = require("express");
const router = express.Router();
const Food = require("../models/foodModel");
const Order = require("../models/orderModel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "upload/foods"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// addFood to database
const addFood = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file.filename;
    const newFood = new Food({ name, description, price, image });
    await newFood.save();
    res.json({ success: true, message: "Đã thêm món ăn thành công!" });
  } catch (err) {
    console.error("❌ Food error:", err);
    res.status(500).json({ success: false, message: "Lỗi khi thêm món ăn" });
  }
};

// get foodList
const getFoods = async (req, res) => {
  try {
    const foods = await Food.find({});
    res.json({ success: true, data: foods });
  } catch (err) {
    console.error("❌ Food error:", err);
    res
      .status(500)
      .json({ success: false, message: "Lỗi khi lấy danh sách món ăn" });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    const { id } = req.params;
    await Food.findByIdAndDelete(id);
    res.json({ success: true, message: "Đã xóa món ăn thành công!" });
  } catch (err) {
    console.error("❌ Food error:", err);
    res.status(500).json({ success: false, message: "Lỗi khi xóa món ăn" });
  }
};

// OrderFood
const orderFood = async (req, res) => {
  console.log("📥 HEADERS:", req.headers);
  console.log("📥 AUTH:", req.auth); // xác minh token đã giải mã ra user chưa
  try {
    const userId = req.auth.sub;
    const { name, image, deliveryDate, deliveryTime, note } = req.body;

    // kiểm tra dữ liệu đầu vào.
    if (!name || !image || !deliveryDate || !deliveryTime) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }
    const date = new Date(deliveryDate);

    if (isNaN(date)) {
      return res.status(400).json({ message: "Ngày giao không hợp lệ" });
    }
    const order = new Order({
      userId,
      name,
      quantity,
      image,
      deliveryDate,
      deliveryTime,
      note,
    });
    await order.save();
    res.status(200).json({ success: true, message: "Đặt món ăn thành công!" });
  } catch (err) {
    console.error("❌ Order food error:", err);
    res.status(500).json({
      success: false,
      message: " Lỗi khi đặt món ăn, vui lòng thử lại sau.",
    });
  }
};

// Lấy danh sách món ăn đã Order.
const getMyOrders = async (req, res) => {
  console.log("📥 HEADERS:", req.headers);
  console.log("📥 AUTH:", req.auth); // xác minh token đã giải mã ra user chưa
  try {
    const userId = req.auth.sub;
    const orders = await Order.find({ userId });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách Order", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách Order, vui lòng thử lại sau.",
    });
  }
};
module.exports = { addFood, getFoods, removeFood, orderFood, getMyOrders };
