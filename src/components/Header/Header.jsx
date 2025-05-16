import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <h2>The Ultimate Hotel Experience</h2>
        <p>Discover Your Perfect Gateway Destination</p>
        <p>
          Unparalleled luxury and comfort await at the world's most exclusive
          hotels and resorts. Start your journey today.
        </p>
        <div className="search-form">
          <div className="form-group">
            <label>Destination</label>
            <select>
              <option>Type here</option>
              <option>Hà Nội</option>
              <option>Hồ Chí Minh</option>
              <option>Đà Nẵng</option>
            </select>
          </div>
          <div className="form-group">
            <label>Check in</label>
            <input type="date" />
          </div>

          <div className="form-group">
            <label>Check out</label>
            <input type="date" />
          </div>

          <div className="form-group">
            <label>Guests</label>
            <input type="number" min="1" defaultValue="1" />
          </div>

          <button className="search-button">🔍 Search</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
