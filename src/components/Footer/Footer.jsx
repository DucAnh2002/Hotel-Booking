import "./Footer.css";
import { assets } from "../../assets/assets";
export default function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-title">
            <img src={assets.logo3} alt="Logo" />
            <h2>Nha Trang Hotel</h2>
          </div>
          <div>
            <p>Address: 123 Nha Trang Street, Nha Trang City, Vietnam</p>
            <p>Phone: +84 123 456 789</p>
            <p>Email:</p>
          </div>
        </div>
        <div className="footer-right">
          <h3>Contact Us</h3>
          <p>Email: </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Ha Duc Anh. All rights reserved.</p>
      </div>
    </div>
  );
}
