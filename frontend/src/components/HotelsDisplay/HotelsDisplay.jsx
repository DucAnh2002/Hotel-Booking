import React from "react";
import hotels from "../../data/Hotels/Hotels.js";
import "./HotelsDisplay.css";
import { useNavigate } from "react-router-dom";
import HotelCard from "./HotelCard.jsx";
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
        <button onClick={() => navigate("/rooms")}>
          Xem thêm khách sạn &raquo;
        </button>
      </div>
    </div>
  );
};
export default HotelsDisplay;
