import React, { useState } from "react";
import Stars from "./Stars.jsx";
import BookingModal from "../Booking/BookingModal.jsx";
import { useAuth0 } from "@auth0/auth0-react";
const HotelCard = ({ hotel }) => {
  const [isBooking, setIsBooking] = useState(false);
  const { image, roomType, rating, address, price } = hotel;
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const handleBookNow = async () => {
    // Check if user is logged in
    if (!isAuthenticated) {
      await loginWithRedirect(); // Redirect to Auth0 login page
    } else {
      setIsBooking(true); // Open booking modal
    }
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
