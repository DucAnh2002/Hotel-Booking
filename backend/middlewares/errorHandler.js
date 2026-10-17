const errorHandler = (err, req, res, next) => {
  console.error("❌ Error Log:", err.stack || err.message);

  const statusCode =
    err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);

  res.status(statusCode).json({
    success: false,
    message: err.message || "Đã xảy ra lỗi hệ thống!",
    errorCode: err.code || "INTERNAL_SERVER_ERROR",
    errors: err.errors || [],
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
