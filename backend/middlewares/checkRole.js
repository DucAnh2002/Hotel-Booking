const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const user = req.dbUser;

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Chưa xác thực người dùng",
        });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Bạn không có quyền truy cập",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { checkRole };
