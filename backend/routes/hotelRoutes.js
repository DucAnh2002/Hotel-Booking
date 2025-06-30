// routes/hotelRoutes.js
const express = require("express");
const router = express.Router();
const checkJwt = require("../middlewares/checkJwt");

router.post("/book-room", checkJwt, (req, res) => {
  const user = req.user;
  res.json({ message: `✅ Đặt phòng thành công cho user ${user.sub}` });
});

router.get("/", (req, res) => {
  res.send("Danh sách khách sạn");
});

module.exports = router;
