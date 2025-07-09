const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const checkJwt = require("../middlewares/checkJwtSimple");
const { getAllRooms, addRoom } = require("../controllers/roomController");
const { bookRoom, getMyBookings } = require("../controllers/bookingController");

// Cấu hình multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "upload/rooms"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Route  phòng
router.get("/list-room", getAllRooms);
router.post("/add", upload.single("image"), addRoom);

module.exports = router;
