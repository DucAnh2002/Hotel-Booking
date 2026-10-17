const sendEmail = require("../utils/sendEmail");
const { getBookingEmailTemplate } = require("../utils/emailTemplates");

exports.sendBookingConfirmationEmail = async (bookingData) => {
  try {
    const htmlContent = getBookingEmailTemplate(bookingData);
    await sendEmail({
      email: bookingData.guestEmail,
      subject: `[Nha Trang Hotel] Xác Nhận Đặt Phòng #${bookingData.bookingCode || bookingData._id}`,
      html: htmlContent,
    });
  } catch (error) {
    console.error("Lỗi gởi email xác nhận: ", error.message);
  }
};
