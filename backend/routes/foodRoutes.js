const express = require("express");
const router = express.Router();
const Food = require("../models/foodModel");
const multer = require("multer");
const checkJwt = require("../middlewares/checkJwt");
const path = require("path");
const {
  addFood,
  getFoods,
  removeOrderItem,
  orderFood,
  getMyOrders,
} = require("../controllers/foodController");

// cấu hình multer để lưu trữ ảnh món ăn
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "upload/foods"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// cấu hình router thêm món
router.post("/add", upload.single("image"), addFood);
// cấu hình router lấy danh sách món ăn
router.get("/list-food", getFoods);
router.delete("/remove/:orderId", checkJwt, removeOrderItem);

// Cấu hình router Order
router.post("/order", checkJwt, orderFood);
router.get("/my-orders", checkJwt, getMyOrders);
module.exports = router;
