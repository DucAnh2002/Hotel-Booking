// src/components/FoodOrder/FoodsOrder.jsx
import { useContext } from 'react'
import './FoodsOrder.css'
import { useNavigate } from 'react-router-dom'
import FoodCard from './FoodCard.jsx'
import { FoodContext } from '../../context/index.js'

const FoodsOrder = () => {
  const navigate = useNavigate()
  const { foodList } = useContext(FoodContext)
  return (
    <div className="food-order">
      <h2>Thực đơn khách sạn</h2>
      <p>
        "Các món ăn tại khách sạn mang đến một bầu không khí sang trọng và một loạt các trải nghiệm ẩm thực đa dạng.
        Khách hàng có thể thưởng thức nhiều món ăn khác nhau, bao gồm Hàn Quốc, Trung Quốc, Nhật Bản và phương Tây cũng
        như các món ăn truyền thống được chuẩn bị chuyên nghiệp bởi các đầu bếp lành nghề. Trải nghiệm một hành trình ẩm
        thực đặc biệt kèm theo dịch vụ tinh tế và trang nhã"
      </p>
      <div className="food-list">
        {Array.isArray(foodList) && foodList.length > 0 ? (
          foodList.slice(0, 4).map(food => <FoodCard key={food._id} food={food} />)
        ) : (
          <p> Đang tải danh sách phòng</p>
        )}
      </div>
      <div className="see-more">
        <button onClick={() => navigate('/catering')}>Xem thêm món ăn &raquo;</button>
      </div>
    </div>
  )
}

export default FoodsOrder
