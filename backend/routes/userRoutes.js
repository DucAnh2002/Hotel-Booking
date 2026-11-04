const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const checkJwt = require("../middlewares/checkJwt");

const loadUser = require("../middlewares/loadUser");

const { checkRole } = require("../middlewares/checkRole");

// LẤY USER HIỆN TẠI

router.get("/me", checkJwt, userController.getCurrentUser);

// LẤY DANH SÁCH USER
// Admin / Manager / Reception/ restaurant

router.get(
  "/",
  checkJwt,
  loadUser,
  checkRole("admin", "manager", "reception"),
  userController.getUsers,
);

// ADMIN TẠO NHÂN VIÊN

router.post(
  "/employees",
  checkJwt,
  loadUser,
  checkRole("admin"),
  userController.createEmployee,
);

// ADMIN CẬP NHẬT ROLE / STATUS

router.patch(
  "/:userId/role",
  checkJwt,
  loadUser,
  checkRole("admin"),
  userController.updateUserRole,
);

module.exports = router;
