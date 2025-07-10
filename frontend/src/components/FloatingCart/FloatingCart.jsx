import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { RoomContext, FoodContext } from '../../context/index.js'
import './FloatingCart.css'

const FloatingCart = () => {
  const navigate = useNavigate()
  const { myBookings } = useContext(RoomContext)
  const { myFoodOrders } = useContext(FoodContext)

  const hasItems = myBookings.length > 0 || myFoodOrders.length > 0

  return (
    <div className="floating-cart" onClick={() => navigate('/cart')}>
      🏡
      {hasItems && <span className="cart-dot" />}
    </div>
  )
}

export default FloatingCart
