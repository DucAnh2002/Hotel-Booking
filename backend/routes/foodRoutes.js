// routes/foodRoutes.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Danh sách món ăn");
});

module.exports = router;
