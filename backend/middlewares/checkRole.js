exports.checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user được gán từ middleware checkJwt / auth
    if (!req.user || !alowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Bạn không có quyền truy cập chức năng này.",
      });
    }
    next();
  };
};
