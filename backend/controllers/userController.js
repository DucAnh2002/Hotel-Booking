const User = require("../models/userModel");
const auth0Service = require("../services/auth0Service");
const crypto = require("crypto");
const EMPLOYEE_ROLES = ["admin", "manager", "reception", "restaurant"];

const ALL_ROLES = ["customer", ...EMPLOYEE_ROLES];

// 1. ADMIN TẠO NHÂN VIÊN

exports.createEmployee = async (req, res, next) => {
  let auth0User = null;
  let mongoUser = null;

  try {
    const { name, email, phone, role } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }

    if (!EMPLOYEE_ROLES.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role không hợp lệ",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email đã tồn tại trong hệ thống",
      });
    }

    // Tạo mật khẩu ngẫu nhiên, chỉ dùng nội bộ để khởi tạo Auth0 User
    const temporaryPassword = crypto.randomBytes(32).toString("base64url");

    //  Tạo tài khoản Auth0
    auth0User = await auth0Service.createAuth0User({
      email: normalizedEmail,
      password: temporaryPassword,
      name,
    });
    const auth0Profile = await auth0Service.getAuth0User(auth0User.user_id);
    // Gán Role Auth0
    const auth0RoleId = auth0Service.ROLE_MAP[role];

    if (auth0RoleId) {
      await auth0Service.assignRoleToUser(auth0User.user_id, auth0RoleId);
    }

    // Lưu MongoDB
    mongoUser = await User.create({
      auth0Id: auth0User.user_id,
      name,
      email: normalizedEmail,
      avatar: auth0Profile.picture || auth0User.picture || "",
      role,
      phone: phone || "",
      status: "active",
    });

    //  Yêu cầu Auth0 gửi email thiết lập mật khẩu
    let invitationEmailSent = true;

    try {
      await auth0Service.sendPasswordSetupEmail(normalizedEmail);
    } catch (emailError) {
      invitationEmailSent = false;

      console.error(
        "Send password setup email failed:",
        emailError.response?.data || emailError.message,
      );
    }

    return res.status(201).json({
      success: true,
      message: invitationEmailSent
        ? "Tạo nhân viên thành công. Email thiết lập mật khẩu đã được gửi."
        : "Tạo nhân viên thành công nhưng gửi email thất bại. Vui lòng gửi lại email.",
      invitationEmailSent,
      data: mongoUser,
    });
  } catch (error) {
    // Rollback nếu tạo Auth0 thành công nhưng lưu MongoDB thất bại
    if (auth0User?.user_id) {
      try {
        if (mongoUser?._id) {
          await User.findByIdAndDelete(mongoUser._id);
        }

        await auth0Service.deleteAuth0User(auth0User.user_id);
      } catch (rollbackError) {
        console.error(
          "Rollback failed:",
          rollbackError.response?.data || rollbackError.message,
        );
      }
    }

    console.error(
      "Create employee error:",
      error.response?.data || error.message,
    );

    next(error);
  }
};

// 2. LẤY DANH SÁCH USER

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-__v").sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// 3. LẤY USER HIỆN TẠI

exports.getCurrentUser = async (req, res, next) => {
  try {
    const auth0Id = req.auth?.sub;

    if (!auth0Id) {
      return res.status(401).json({
        success: false,
        message: "Không xác định được tài khoản đăng nhập",
      });
    }
    // Tìm tài khoản đã được admin tạo trong MongoDB

    const user = await User.findOne({ auth0Id }).select("-__v");

    // Không có trong DB => không phải nhân viên KS được cấp quyền.
    if (!user) {
      return res.status(403).json({
        success: false,
        code: "STAFF_NOT_FOUND",
        message: "Tài khoản của bạn không thuộc nhân viên khách sạn.",
      });
    }

    // Kiểm tra trạng thái
    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        code: "STAFF_INACTIVE",
        message: "Tài khoản đã bị khóa hoặc ngừng hoạt động",
      });
    }
    // Chỉ cho phép các role nhân viên
    const allowedRoles = ["admin", "manager"];
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        code: "STAFF_ROLE_NOT_ALLOWED",
        message: "Tài khoản của bạn không có quyền truy cập.",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(
      "Get current user error:",
      error.response?.data || error.message,
    );
    next(error);
  }
};

// 4. CẬP NHẬT ROLE / STATUS

exports.updateUserRole = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { role, status } = req.body;

    // Validate Role
    if (role !== undefined && !ALL_ROLES.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role không hợp lệ",
      });
    }

    // Validate status
    const validStatuses = ["active", "inactive", "suspended"];

    if (status !== undefined && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Trạng thái không hợp lệ",
      });
    }

    if (role === undefined && status === undefined) {
      return res.status(400).json({
        success: false,
        message: "Không có dữ liệu cần cập nhật",
      });
    }

    const targetUser = await User.findById(userId);

    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    // Không cho Admin tự thay đổi quyền hoặc trạng thái
    if (targetUser.auth0Id === req.dbUser.auth0Id) {
      return res.status(400).json({
        success: false,
        message: "Bạn không thể tự thay đổi quyền hoặc trạng thái của mình",
      });
    }

    const oldRole = targetUser.role;

    // MongoDB là nguồn phân quyền chính
    if (role !== undefined) {
      targetUser.role = role;
    }

    if (status !== undefined) {
      targetUser.status = status;
    }

    const updatedUser = await targetUser.save();

    // Đồng bộ Auth0 nếu Role thay đổi
    let auth0RoleSynced = true;

    if (role !== undefined && role !== oldRole && targetUser.auth0Id) {
      try {
        await auth0Service.replaceUserRole(targetUser.auth0Id, role);
      } catch (auth0Error) {
        auth0RoleSynced = false;

        console.error(
          "Auth0 synchronization error:",
          auth0Error.response?.data || auth0Error.message,
        );
      }
    }

    return res.status(200).json({
      success: true,
      message: auth0RoleSynced
        ? "Cập nhật người dùng thành công"
        : "MongoDB đã cập nhật nhưng Auth0 đồng bộ thất bại",
      auth0RoleSynced,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
