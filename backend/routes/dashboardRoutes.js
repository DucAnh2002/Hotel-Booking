const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { checkRole } = require("../middlewares/checkRole");

// Route lấy toàn bộ số liệu thống kê cho Dashboard Admin
router.get(
  "/stats",
  checkRole("admin", "manager", "reception"),
  dashboardController.getDashboardStats,
);

module.exports = router;
