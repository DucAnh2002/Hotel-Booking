import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { RoomContext, FoodContext } from '../../../context'

const FloatingCart: React.FC = () => {
  const navigate = useNavigate()

  const { myBookings } = useContext(RoomContext)
  const { myFoodOrders } = useContext(FoodContext)

  const hasItems = (myBookings?.length ?? 0) > 0 || (myFoodOrders?.length ?? 0) > 0

  return (
    <div
      onClick={() => navigate('/cart')}
      className="fixed bottom-5 z-[1000] w-14 h-14 flex items-center justify-center
       bg-black text-white text-xl rounded-full shadow-lg 
       cursor-pointer transition hover:scale-110 active:scale-95 "
    >
      🛒
      {hasItems && (
        <span
          className="absolute -top-1 -right-1 min-w-[180px] bg-red-600 text-white text-[10px]
      rounded-full flex items-center justify-center "
        />
      )}
    </div>
  )
}

export default FloatingCart
