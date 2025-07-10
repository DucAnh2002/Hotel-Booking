import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./List.css"; // CSS bạn tự tạo thêm

const List = () => {
  const [productList, setProductList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const removeDiacritics = (str) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const fetchData = async () => {
    try {
      const [foodRes, roomRes] = await Promise.all([
        axios.get(`${url}/api/food/list-food`),
        axios.get(`${url}/api/room/list-room`),
      ]);

      const foodList = foodRes.data.data.map((item) => ({
        ...item,
        type: "food",
      }));
      const roomList = roomRes.data.data.map((item) => ({
        ...item,
        type: "room",
      }));

      setProductList([...foodList, ...roomList]);
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu:", err);
      toast.error("Không thể tải danh sách sản phẩm.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredList = productList.filter((item) => {
    const search = removeDiacritics(searchQuery);
    const value = removeDiacritics(item.name || item.roomType || "");
    return value.includes(search);
  });

  const deleteItem = async (id, type) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    try {
      const res = await axios.delete(`${url}/${type}/remove/${id}`);
      if (res.data.success) {
        toast.success("Đã xóa thành công!");
        fetchData();
      } else {
        toast.error(res.data.message || "Lỗi khi xóa.");
      }
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
      toast.error("Không thể xóa. Vui lòng thử lại.");
    }
  };

  return (
    <div className="list-container">
      <h2>Quản lý sản phẩm</h2>
      <input
        type="text"
        className="list-search"
        placeholder="Tìm theo tên món hoặc loại phòng..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {filteredList.length === 0 && <p>Không tìm thấy sản phẩm nào.</p>}

      {filteredList.map((item, index) => (
        <div key={index} className="list-item">
          <img
            src={`${url}/upload/${item.type === "food" ? "foods" : "rooms"}/${
              item.image
            }`}
            alt={item.name || item.roomType}
            className="list-img"
          />
          <div className="list-details">
            {item.type === "food" ? (
              <>
                <hr />
                <p>
                  <strong>Tên món:</strong> {item.name}
                </p>
                <p>
                  <strong>Mô tả:</strong> {item.description}
                </p>
                <p>
                  <strong>Giá:</strong> {Number(item.price).toLocaleString()}đ
                </p>
              </>
            ) : (
              <>
                <hr />
                <p>
                  <strong>Loại phòng:</strong> {item.roomType}
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {item.address}
                </p>
                <p>
                  <strong>Rating:</strong> {item.rating}
                </p>
                <p>
                  <strong>Giá:</strong> {Number(item.price).toLocaleString()}đ
                </p>
              </>
            )}
          </div>

          <div className="list-actions">
            <button onClick={() => deleteItem(item._id, item.type)}>Xóa</button>
            <button>Sửa</button>
          </div>

          <hr style={{ marginTop: "20px", marginBottom: "20px" }} />
        </div>
      ))}
    </div>
  );
};

export default List;
