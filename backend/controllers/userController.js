const User = require("../models/userModel");
const auth0Service = require("../services/auth0Service");

// Map tên Role sang AUth0 Role Id tương ứng lấy từ Auth0-Dashboard
const ROLE_MAP = {
  reception: "rol_reception_id_xxx",
  kitchen: "rol_kitchen_id_xxx",
  manager: "rol_manager_id_xxx",
  admin: "rol_admin_id_xxx",
};

// 1. Admin tạo tài khoản nhân viên mới & phân quyền
exports.createEmployee = async (req, res, next) => {
  try {
    const { name, email, password, role, phoneNumber } = req.body;

    // Kiểm tra email đã tồn tại trong DB chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Email này đã tồn tại trong hệ thống !",
        });
    }

    //Tạo User trên hệ thống Auth0
    const auth0User = await auth0Service.createAuth0User({
      email,
      password,
      name,
    });

    // Gán Role cho User trên Auth0 nếu có quy định role
    const auth0RoleId = ROLE_MAP[role];
    if (auth0RoleId) {
      await auth0Service.assignRoleToUser(auth0User.user_id, auth0RoleId);
    }
    // Lưu thông tin nhân viên vào MongoDB
    const newEmployee = await User.create({
      auth0Id: auth0User.user_id,
      name,
      email,
      role: role || "reception",
      phoneNumber,
      isActive: true,
    });
    res.status(201).json({
      success: true,
      message: `Tạo tài khoản nhân viên [${role}] thành công`,
      data: newEmployee,
    });
  } catch (error) {
    console.error("Lỗi tạo nhân viên:", error.response?.data || error.message);
    next(error);
  }
};
// Lấy danh sách khách hàng và nhân viên
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createAt: -1 });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

// Lấy thông tin user hiện tại (Dựa vào Auth0 Toke "req.auth?.sub")
exports.getCurrentUser = async (req, res, next) => {
  try {
    const auth0Id = req.auth?.sub;
    let user = await User.findOne({ auth0Id });

    // Nếu lần đầu đăng nhập, tự động tạo profile trong MongoDB
    if (!user && req.auth?.email) {
      user = await User.create({
        auth0Id,
        email: req.auth.email,
        name: req.auth.name || "Người dùng mới",
        role: "customer",
      });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// Cập nhật role cho nhân viên
exports.updateUserRole = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { role, isActive } = req.body;

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy người dùng!" });
    }
    // Không cho phép tự đổi Role của chính mình để tránh mất quyền Admin
    const currentAdminAuth0Id = req.auth?.sub;
    if (targetUser.auth0Id === currentAdminAuth0Id) {
      return res.status(400).json({
        success: false,
        message: "Bạn không thể tự thay đổi quyền của chính mình !",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        role,
        isActive,
      },
      { new: true, runValidators: true },
    );

    res.status(200).json({
      susccess: true,
      messagge: "Cập nhật quyền thành công!",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
