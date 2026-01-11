import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import FoodCard from './FoodCard'
import { FoodContext } from '../../../context'

import type { FoodItem, FoodContextType } from '../../../types/foodTypes'

const FoodsOrder: React.FC = () => {
  const navigate = useNavigate()

  const { foodList } = useContext(FoodContext) as FoodContextType

  return (
    <div className="bg-[rgba(121,90,90,0.3)] py-12 px-8 max-w-[1200px] mx-auto text-center">
      <h2 className="text-2xl mb-4 bg-black/40 text-white py-2 rounded">Thực đơn khách sạn</h2>

      <p className="max-w-[800px] mx-auto mb-8 text-[#444] text-base leading-relaxed">
        Các món ăn tại khách sạn mang đến một bầu không khí sang trọng và một loạt các trải nghiệm ẩm thực đa dạng.
        Khách hàng có thể thưởng thức nhiều món ăn khác nhau...
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6 mt-8">
        {Array.isArray(foodList) && foodList.length > 0 ? (
          foodList.slice(0, 4).map((food: FoodItem) => <FoodCard key={food._id} food={food} />)
        ) : (
          <p>Đang tải danh sách món ăn...</p>
        )}
      </div>

      <div className="mt-8">
        <button
          onClick={() => navigate('/catering')}
          className="px-5 py-2.5 bg-black text-white rounded-lg hover:bg-[#222] transition"
        >
          Xem thêm món ăn »
        </button>
      </div>
    </div>
  )
}

export default FoodsOrder
