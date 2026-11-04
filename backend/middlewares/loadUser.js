const User = require("../models/userModel");

const loadUser = async (req, res, next) => {
  try {
    const auth0Id = req.auth?.sub;

    if (!auth0Id) {
      return res.status(401).json({
        success: false,
        message: "Không tìm thấy thông tin xác thực",
      });
    }

    const user = await User.findOne({ auth0Id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy hồ sơ người dùng",
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Tài khoản đã bị khóa hoặc tạm ngưng",
      });
    }

    // Lưu thông tin user vào request
    req.dbUser = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = loadUser;
