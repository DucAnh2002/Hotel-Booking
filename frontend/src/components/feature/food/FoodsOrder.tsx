import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import FoodCard from './FoodCard'
import { FoodContext } from '../../../context'

import type { FoodItem, FoodContextType } from '../../../types/foodTypes'

const FoodsOrder: React.FC = () => {
  const navigate = useNavigate()

  const { foodList } = useContext(FoodContext) as FoodContextType

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto text-center">
      <h2 className="text-2xl sm:text-3xl font-bold mb-3">Thực đơn khách sạn</h2>

      <p className="max-w-xl mx-auto mb-8 text-gray-600 text-sm sm:text-base">
        Các món ăn tại khách sạn mang đến một bầu không khí sang trọng và một loạt các trải nghiệm ẩm thực đa dạng.
        Khách hàng có thể thưởng thức nhiều món ăn khác nhau...
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {Array.isArray(foodList) && foodList.length > 0 ? (
          foodList.slice(0, 4).map((food: FoodItem) => <FoodCard key={food._id} food={food} />)
        ) : (
          <p className="text-gray-500">Đang tải danh sách món ăn...</p>
        )}
      </div>

      <div className="mt-8">
        <button
          onClick={() => navigate('/catering')}
          className="mt-10 px-6 bg-black text-white rounded-xl hover:bg-gray-800 transistion"
        >
          Xem thêm món ăn »
        </button>
      </div>
    </div>
  )
}

export default FoodsOrder
