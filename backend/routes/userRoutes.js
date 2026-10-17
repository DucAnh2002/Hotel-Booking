const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const checkJwt = require("../middlewares/checkJwt");
const { checkRole } = require("../middlewares/checkRole");

// Lấy thông tin user hiên tại (Điều kiện phải đăng nhập Auth0)
router.get("/me", checkJwt, userController.getCurrentUser);
// Lấy danh sách user (Yêu cầu đăng nhập Auth0 + phải có quyền admin/manager/reception)
router.get(
  "/",
  checkRole("admin", "manager", "reception"),
  userController.getUsers,
);

// Cập nhật quyền nhân viên (Yêu cầu đăng nhập Auth0 + Chỉ admin mới được sửa)
router.patch(
  "/:userId/role",
  checkJwt,
  checkRole("admin"),
  userController.updateUserRole,
);

module.exports = router;
