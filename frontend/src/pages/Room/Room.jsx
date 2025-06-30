import React from "react";
import hotels from "../../data/Hotels/Hotels.js";
import HotelCard from "../../components/HotelsDisplay/HotelCard.jsx";
import FloatingCart from "../../components/FloatingCart/FloatingCart.jsx";
const Room = (cart) => {
  return (
    <div className="hotels-display-container">
      <h2>Featured Destination</h2>
      <p>
        Discover our handpicked selection of exceptional properties around the
        world, offering unparalleled luxury and unforgettable experiences.
      </p>
      <div className="hotels-list">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
      <FloatingCart cart={cart} />
    </div>
  );
};

export default Room;
