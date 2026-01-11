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
      <div className="bg-[#fff] rounded-[16px] p-4 shadow-[0 8px 24px rgba(0, 0, 0, 0.1)] overflow-hidden transition-transform duration-300 ease-in-out flex flex-col text-left hover:-translate-y-1">
        <img src={`${url}/upload/foods/${image}`} alt="image" className="w-full h-[180px] object-cover" />
        <h3 className="text-[1.2rem] font-bold text-center mt-4 mx-4 text-[#222] ">{name}</h3>
        <p className="mx-4 mb-3 text-[#666] text-center text-[0.95rem] leading-[1.4]">{description}</p>
        <p className="font-bold mx-4 mb-4 text-[#e53935] text-center">{price.toLocaleString()} VND</p>
        <button
          className=" w-full py-2 bg-[#00a86b] cursor-pointer text-white rounded-lg transition-colors duration-300 hover:bg-[#007c50] "
          onClick={handleAddToCart}
        >
          Chọn món
        </button>
      </div>

      {/* Hiển thị modal khi isOrder = true */}
      {isOrder && <FoodOrderModal food={food} onClose={() => setIsOrder(false)} />}
    </>
  )
}

export default FoodCard
