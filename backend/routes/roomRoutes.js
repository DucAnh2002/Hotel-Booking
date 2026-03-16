const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getAllRooms,
  addRoom,
  getRoomById,
} = require("../controllers/roomController");

// cấu hình upload ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "upload/rooms"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// routes
router.get("/list-room", getAllRooms);
router.get("/:id", getRoomById);
router.post("/add", upload.single("image"), addRoom);

module.exports = router;
