import './FoodCard.css'
import { useState } from 'react'
import FoodOrderModal from '../Booking/foodOrderModel.jsx'
import { useAuth0 } from '@auth0/auth0-react'

const FoodCard = ({ food }) => {
  const [isOrder, setIsOrder] = useState(false)
  const { image, name, description, price } = food
  const { isAuthenticated, loginWithRedirect } = useAuth0()
  const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      await loginWithRedirect() // chuyển hướng đến trang đăng nhập Auth0
    } else {
      setIsOrder(true) // mở modal order món ăn
    }
  }

  return (
    <>
      <div className="food-card">
        <img src={`${url}/upload/foods/${image}`} alt="image" className="food-img" />
        <h3>{name}</h3>
        <p>{description}</p>
        <p className="price">{price.toLocaleString()} VND</p>
        <button className="btn" onClick={handleAddToCart}>
          Chọn món
        </button>
      </div>

      {/* Hiển thị modal khi isOrder = true */}
      {isOrder && <FoodOrderModal food={food} onClose={() => setIsOrder(false)} />}
    </>
  )
}

export default FoodCard
