import React, { useState } from "react";
import Stars from "./Stars.jsx";
import BookingModal from "../Booking/BookingModal.jsx";
const HotelCard = ({ hotel }) => {
  const [isBooking, setIsBooking] = useState(false);
  const { image, roomType, rating, address, price } = hotel;
  const handleBookNow = () => {
    setIsBooking(true);
  };
  return (
    <>
      <div className="hotel-card">
        <img src={image} alt={roomType} className="hotel-image" />
        <h3 className="room-type">{roomType}</h3>
        <Stars count={rating} />
        <p className="address">{address}</p>
        <p className="price">
          {price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </p>
        <button className="book-button" onClick={handleBookNow}>
          Book Now
        </button>
      </div>

      {isBooking && (
        <BookingModal hotel={hotel} onClose={() => setIsBooking(false)} />
      )}
    </>
  );
};
export default HotelCard;
