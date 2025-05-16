import React from "react";
import hotels from "../../data/Hotels/Hotels.js";
import "./HotelsDisplay.css";
import { useNavigate } from "react-router-dom";

const Stars = ({ count }) => {
  const starsArray = [];
  for (let i = 0; i < 5; i++) {
    starsArray.push(
      <span key={i} className={i < count ? "star filled" : "star"}>
        &#9733;
      </span>
    );
  }
  return <div className="stars">{starsArray}</div>;
};
const HotelCard = ({ hotel }) => {
  const { image, roomType, rating, address, price } = hotel;
  return (
    <div className="hotel-card">
      <img src={image} alt={roomType} className="hotel-image" />
      <h3 className="room-type">{roomType}</h3>
      <Stars count={rating} />
      <p className="address">{address}</p>
      <p className="price">
        {price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
      </p>
      <button
        className="book-button"
        onClick={() => alert(`Đặt phòng: ${roomType}`)}
      >
        Book Now
      </button>
    </div>
  );
};

const HotelsDisplay = () => {
  const navigate = useNavigate();
  return (
    <div className="hotels-display-container">
      <h2>Featured Destination</h2>
      <p>
        Discover our handpicked selection of exceptional properties around the
        world, offering unparalleled luxury and unforgettable experiences.
      </p>
      <div className="hotels-list">
        {hotels.slice(0, 4).map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
      <div className="see-more">
        <button onClick={() => navigate("/hotels")}>
          Xem thêm khách sạn &raquo;
        </button>
      </div>
    </div>
  );
};
export default HotelsDisplay;
