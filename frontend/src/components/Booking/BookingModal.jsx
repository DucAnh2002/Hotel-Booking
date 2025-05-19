import React, { useState } from "react";
import "./BookingModal.css";
import { useEffect } from "react";

const BookingModal = ({ hotel, onClose }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const diffDays = Math.ceil(checkOutDate - checkInDate);
      const days = Math.ceil(diffDays / (1000 * 60 * 60 * 24));
      if (diffDays > 0) {
        setTotalPrice(days * hotel.pricePerNight * guests);
      }
      setTotalPrice(days * hotel.pricePerNight * guests);
    }
  }, [checkIn, checkOut, guests, hotel.pricePerNight]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffDays = Math.ceil(checkOutDate - checkInDate);
    if (diffDays <= 0) {
      alert("Ngày check-out phải sau ngày check-in.");
      return;
    }
    alert(`
      Đặt phòng: ${hotel.roomType}
      Check-in: ${checkIn}
      Check-out: ${checkOut}
      Số khách: ${guests}
      Số đêm: ${diffDays}
      Tổng giá: ${totalPrice.toLocaleString()} VND
    `);
    onClose(); // close modal after booking
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Đặt phòng: {hotel.roomType}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Check-in:
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
          </label>
          <label>
            Check-out:
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </label>
          <label>
            Số lượng khách:
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              min="1"
              required
            />
          </label>
          {checkIn && checkOut && (
            <p>
              <strong>Tổng tiền:</strong>{" "}
              {totalPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          )}
          <div className="modal-buttons">
            <button type="submit">Xác nhận đặt</button>
            <button type="button" onClick={onClose}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
