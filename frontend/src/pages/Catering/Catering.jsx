import { useContext } from 'react'
import './Catering.css'
import { FoodContext } from '../../context/index.js'
import FloatingCart from '../../components/FloatingCart/FloatingCart.jsx'
import FoodCard from '../../components/FoodsOrder/FoodCard.jsx'

const Catering = () => {
  const { foodList, cartItems } = useContext(FoodContext)
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
          foodList.map(food => <FoodCard key={food._id} food={food} />)
        ) : (
          <p>Đang tải danh sách món ăn...</p>
        )}
      </div>
      <FloatingCart cart={cartItems} />
    </div>
  )
}

export default Catering
