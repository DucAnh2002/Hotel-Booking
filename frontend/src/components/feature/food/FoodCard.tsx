import { useState } from 'react'
import FoodOrderModal from '../../feature/booking/foodOrderModel'
import { useAuth0 } from '@auth0/auth0-react'
import type { FoodItem } from '../../../types/foodTypes'

// Định nghĩa interface cho props của FoodCard
interface FoodCardProps {
  food: FoodItem
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const [isOrder, setIsOrder] = useState<boolean>(false)
  const { image, name, description, price } = food
  const { isAuthenticated, loginWithRedirect } = useAuth0()
  const url: string = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

  const handleAddToCart = async (): Promise<void> => {
    if (!isAuthenticated) {
      await loginWithRedirect() // chuyển hướng đến trang đăng nhập Auth0
    } else {
      setIsOrder(true) // mở modal order món ăn
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-duration-300 flex flex-col">
        <div className="overflow-hidden">
          <img
            src={`${url}/upload/foods/${image}`}
            alt="image"
            className="w-full h-[180px] object-cover transition duration-300 hover:scale-105"
          />
        </div>
        {/* content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-lg text-gray-800 mb-1 line-clamp-1">{name}</h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-2">{description}</p>
          <p className="font-bold text-red-500 mb-4">{price.toLocaleString()} VND</p>
          <button
            className=" mt-auto w-full py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition active:scale-95 "
            onClick={handleAddToCart}
          >
            Chọn món
          </button>
        </div>
      </div>

      {/* Hiển thị modal khi isOrder = true */}
      {isOrder && <FoodOrderModal food={food} onClose={() => setIsOrder(false)} />}
    </>
  )
}

export default FoodCard
