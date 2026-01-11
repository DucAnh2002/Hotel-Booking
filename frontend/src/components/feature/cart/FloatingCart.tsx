import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { RoomContext, FoodContext } from '../../../context'

const FloatingCart: React.FC = () => {
  const navigate = useNavigate()

  const { myBookings } = useContext(RoomContext)
  const { myFoodOrders } = useContext(FoodContext)

  const hasItems = (myBookings?.length ?? 0) > 0 || (myFoodOrders?.length ?? 0) > 0

  return (
    <div className="fixed bottom-5 right-5 text-[32px] cursor-pointer z-[1000]" onClick={() => navigate('/cart')}>
      🛒
      {hasItems && (
        <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-600 rounded-full border-2 border-white shadow flex items-center justify-center" />
      )}
    </div>
  )
}

export default FloatingCart
