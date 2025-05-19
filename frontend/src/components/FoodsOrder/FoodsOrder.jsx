import React from "react";

import "./FoodsOrder.css";
import foodItems from "../../data/Foods/Foods.js";
import { useNavigate } from "react-router-dom";

const FoodsOrder = () => {
  const navigate = useNavigate();

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
        {foodItems.slice(0, 4).map((food) => (
          <div className="food-card" key={food.id}>
            <img src={food.image} alt={food.name} />
            <h3>{food.name}</h3>
            <p>{food.description}</p>
            <p className="price">{food.price.toLocaleString()} VND</p>
            <button>Chọn món</button>
          </div>
        ))}
      </div>
      <div className="see-more">
        <button onClick={() => navigate("/catering")}>
          Xem thêm món ăn &raquo;
        </button>
      </div>
    </div>
  );
};

export default FoodsOrder;
