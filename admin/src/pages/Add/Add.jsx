import React, { useState } from "react";
import "./Add.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets.js";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [category, setCategory] = useState("food");
  const [foodData, setFoodData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [roomData, setRoomData] = useState({
    roomType: "",
    rating: "",
    address: "",
    price: "",
  });
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    if (category === "food") {
      setFoodData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setRoomData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (category === "food") {
      formData.append("name", foodData.name);
      formData.append("description", foodData.description);
      formData.append("price", Number(foodData.price));
    } else {
      formData.append("roomType", roomData.roomType);
      formData.append("rating", Number(roomData.rating));
      formData.append("address", roomData.address);
      formData.append("price", Number(roomData.price));
    }

    formData.append("category", category);
    formData.append("image", image);

    try {
      const endpoint = `${url}/${category}/add`;
      const response = await axios.post(endpoint, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setFoodData({ name: "", description: "", price: "" });
        setRoomData({ roomType: "", rating: "", address: "", price: "" });
        setImage(false);
        setCategory("food");
        toast.success("Thêm sản phẩm thành công!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Chi tiết lỗi:", error);
      toast.error(error.response?.data?.message || "Lỗi khi gửi dữ liệu!");
    }
  };

  return (
    <form className="add-form" onSubmit={onSubmitHandler}>
      <div className="add-form-group">
        <p>Product image</p>
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload}
            alt=""
            style={{ width: "200px", cursor: "pointer" }}
          />
        </label>
        <input
          type="file"
          id="image"
          hidden
          required
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      {/* Category select */}
      <div className="add-product-category">
        <p>Product category</p>
        <select
          className="add-select"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="food">Food</option>
          <option value="room">Room</option>
        </select>
      </div>

      {/* Fields conditionally rendered */}
      {category === "food" ? (
        <>
          <div className="add-product-name">
            <p>Product name</p>
            <input
              type="text"
              name="name"
              value={foodData.name}
              placeholder="Enter food name"
              onChange={onChangeHandler}
            />
          </div>
          <div className="add-product-description">
            <p>Product description</p>
            <textarea
              name="description"
              value={foodData.description}
              placeholder="Enter food description"
              rows="6"
              onChange={onChangeHandler}
            />
          </div>
          <div className="add-product-price">
            <p>Product price</p>
            <input
              type="number"
              name="price"
              value={foodData.price}
              placeholder="Enter food price"
              onChange={onChangeHandler}
            />
          </div>
        </>
      ) : (
        <>
          <div className="add-room-type">
            <p>Room type</p>
            <input
              type="text"
              name="roomType"
              value={roomData.roomType}
              placeholder="Enter room type"
              onChange={onChangeHandler}
            />
          </div>
          <div className="add-room-rating">
            <p>Rating</p>
            <input
              type="number"
              name="rating"
              value={roomData.rating}
              placeholder="Enter rating (1-5)"
              onChange={onChangeHandler}
            />
          </div>
          <div className="add-room-address">
            <p>Address</p>
            <input
              type="text"
              name="address"
              value={roomData.address}
              placeholder="Enter room address"
              onChange={onChangeHandler}
            />
          </div>
          <div className="add-room-price">
            <p>Room price</p>
            <input
              type="number"
              name="price"
              value={roomData.price}
              placeholder="Enter room price"
              onChange={onChangeHandler}
            />
          </div>
        </>
      )}

      <button type="submit" className="add-btn">
        ADD
      </button>
    </form>
  );
};

export default Add;
