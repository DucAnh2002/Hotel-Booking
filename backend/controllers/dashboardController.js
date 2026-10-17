const dashboardService = require("../services/dashboardService");

exports.getDashboardStats = async (req, res) => {
  try {
    const stats = await dashboardService.getOverviewStats();
    const activities = await dashboardService.getRecentActivities();

    res.status(200).json({
      success: true,
      message: "Lấy dữ liệu Dashboard thành công!",
      data: {
        stats,
        activities,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        "Lỗi khi lấy dữ liệu Dashboard, vui lòng thử lại sau." + err.message,
    });
  }
};
