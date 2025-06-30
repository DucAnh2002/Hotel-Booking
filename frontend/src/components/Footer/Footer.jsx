import "./Footer.css";
import { assets } from "../../assets/assets";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
export default function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-logo">
        <div className="footer-brand">
          <h2>Nha Trang Hotel</h2>
          <img src={assets.logo3} alt="Logo" />
        </div>
        <div className="footer-title">
          <h2>Thông tin liên hệ</h2>
          <p>Address: 123 Nha Trang Street, Nha Trang City, Vietnam</p>
          <p>Phone: +84 123 456 789</p>
          <p>Email: NhaTrangHotels@gmail.com</p>
        </div>
        <div className="footer-right">
          <h2>Về chúng tôi</h2>
          <p>
            Chuyên cung cấp dịch vụ đặt khách sạn và đồ ăn uy tín. Nhanh chóng –
            tiện lợi – an toàn. Hỗ trợ khách hàng 24/7.
          </p>
        </div>

        <div className="footer-social">
          <h2>Theo dõi chúng tôi</h2>
          <p>
            Theo dõi chúng tôi trên các mạng xã hội để cập nhật thông tin mới
            nhất về khách sạn và các chương trình khuyến mãi.
          </p>

          <div className="social-icons">
            <FaFacebook />
            <FaInstagram />
            <FaTiktok />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Ha Duc Anh. All rights reserved.</p>
      </div>
    </div>
  );
}
