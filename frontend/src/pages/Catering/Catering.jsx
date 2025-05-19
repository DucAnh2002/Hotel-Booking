import React, { useState } from "react";
import "./Catering.css";
import foodItems from "../../data/Foods/Foods.js";
import { useNavigate } from "react-router-dom";

const Catering = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState({});

  const handleAddToCart = (foodId) => {
    setCart((prev) => ({
      ...prev,
      [foodId]: (prev[foodId] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (foodId) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[foodId] > 1) newCart[foodId] -= 1;
      else delete newCart[foodId];
      return newCart;
    });
  };

  return (
    <div className="food-order">
      <h2>Thực đơn khách sạn</h2>
      <p>
        "Các món ăn tại khách sạn mang đến một bầu không khí sang trọng và một
        loạt các trải nghiệm ẩm thực đa dạng. Khách hàng có thể thưởng thức
        nhiều món ăn khác nhau, bao gồm Hàn Quốc, Trung Quốc, Nhật Bản và phương
        Tây cũng như các món ăn truyền thống được chuẩn bị chuyên nghiệp bởi các
        đầu bếp lành nghề. Trải nghiệm một hành trình ẩm thực đặc biệt kèm theo
        dịch vụ tinh tế và trang nhã"
      </p>
      <div className="food-list">
        {foodItems.map((food) => (
          <div className="food-card" key={food.id}>
            <img src={food.image} alt={food.name} />
            <h3>{food.name}</h3>
            <p>{food.description}</p>
            <p className="price">{food.price.toLocaleString()} VND</p>

            {cart[food.id] ? (
              <div className="quantity-controls">
                <button onClick={() => handleRemoveFromCart(food.id)}>-</button>
                <span>{cart[food.id]}</span>
                <button onClick={() => handleAddToCart(food.id)}>+</button>
              </div>
            ) : (
              <button onClick={() => handleAddToCart(food.id)}>Chọn món</button>
            )}
          </div>
        ))}
      </div>

      {/* Giỏ hàng nổi */}
      <div className="floating-cart" onClick={() => navigate("/cart")}>
        🛒
        {Object.keys(cart).length > 0 && (
          <span className="cart-badge">
            {Object.values(cart).reduce((a, b) => a + b)}
          </span>
        )}
      </div>
    </div>
  );
};

export default Catering;
