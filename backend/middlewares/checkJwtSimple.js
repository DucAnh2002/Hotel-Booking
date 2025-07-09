const jwt = require("jsonwebtoken");

const checkJwtSimple = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Thiếu Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.decode(token); // KHÔNG verify chữ ký, chỉ decode
    if (!decoded?.sub) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }

    req.user = decoded; // Gán thông tin user vào request
    next();
  } catch (err) {
    console.error("Lỗi decode token:", err);
    return res.status(401).json({ message: "Không thể giải mã token" });
  }
};

module.exports = checkJwtSimple;
