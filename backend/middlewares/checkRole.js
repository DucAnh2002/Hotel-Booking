exports.checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    const userEmail =
      req.auth?.email || req.auth?.["https://hotel-pms.com/email"];
    const adminEmails = process.env.ADMIN_EMAIL
      ? process.env.ADMIN_EMAIL.split(",")
      : [];

    // Nếu Email nằm trong danh sách BOOTSTRAP ADMIN -> cho qua.
    if (userEmail && adminEmails.includes(userEmail)) {
      return next();
    }
    // Kiemer tra theo Custom Claim thông thường từ Auth0
    const userRoles = req.auth?.["https://hotel-pms.com/roles"] || ["customer"];
    const hasRole = userRoles.some((role) => allowedRoles.includes(role));

    if (!hasRole) {
      return res.status(403).json({
        success: false,
        message: "Bạn không có quyền truy cập chức năng này.",
      });
    }
    next();
  };
};
