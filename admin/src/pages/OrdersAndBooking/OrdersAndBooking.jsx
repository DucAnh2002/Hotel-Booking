import { useState, useEffect } from "react";
import axios from "axios";
import "./OrdersAndBooking.css";
const OrderAndBooking = () => {
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderRes, bookingRes] = await Promise.all([
          axios.get(`${url}/api/booking/list-orders`),
          axios.get(`${url}/api/booking/list-bookings`),
        ]);
        setOrders(orderRes.data.data || []);
        setBookings(bookingRes.data.data || []);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu đơn đặt:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-container">
      <h2>Đơn đặt món (Tất cả)</h2>
      {orders.length === 0 && <p>Không có đơn đặt món nào.</p>}
      {orders.map((item, index) => (
        <div key={index} className="admin-order-item">
          <img
            src={`${url}/upload/foods/${item.image}`}
            alt={item.name}
            className="admin-img"
          />
          <div>
            <p>
              <strong>Email:</strong> {item.userEmail}
            </p>
            <p>
              <strong>Món:</strong> {item.name}
            </p>
            <p>
              <strong>Số lượng:</strong> {item.quantity}
            </p>
            <p>
              <strong>Ngày giao:</strong> {item.deliveryDate}
            </p>
            <p>
              <strong>Giờ giao:</strong> {item.deliveryTime}
            </p>
            <p>
              <strong>Ghi chú:</strong> {item.note || "Không có"}
            </p>
          </div>
        </div>
      ))}

      <hr />

      <h2>Danh sách đặt phòng (Tất cả)</h2>
      {bookings.length === 0 && <p>Không có đặt phòng nào.</p>}
      {bookings.map((booking, index) => (
        <div key={index} className="admin-booking-item">
          <img
            src={`${url}/upload/rooms/${booking.roomId.image}`}
            alt="room"
            className="admin-img"
          />
          <div>
            <p>
              <strong>Email:</strong> {booking.userEmail}
            </p>
            <p>
              <strong>Loại phòng:</strong> {booking.roomId.roomType}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {booking.roomId.address}
            </p>
            <p>
              <strong>Check-in:</strong>{" "}
              {new Date(booking.checkInDate).toLocaleDateString("vi-VN")}
            </p>
            <p>
              <strong>Check-out:</strong>{" "}
              {new Date(booking.checkOutDate).toLocaleDateString("vi-VN")}
            </p>
            <p>
              <strong>Số người:</strong> {booking.guests}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderAndBooking;
