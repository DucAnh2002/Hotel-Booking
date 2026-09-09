import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import FoodCard from './FoodCard'
import { FoodContext } from '../../../context'

import type { FoodItem, FoodContextType } from '../../../types/food.types'

const FoodsOrder: React.FC = () => {
  const navigate = useNavigate()

  const { foodList } = useContext(FoodContext) as FoodContextType

  const featuredFoods = Array.isArray(foodList) ? foodList.slice(0, 4) : []

  return (
    <section className="bg-[#fcf3d2] px-4 py-20 sm:px-6 lg:py-1">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
          {/* Left-Content */}
          <div className="text-left">
            {/* Label */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C9A227]" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A227]">Hotel Restaurant</span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-3xl font-medium leading-tight text-[#0B1F33] sm:text-4xl lg:text-5xl">
              Thực đơn
              <span className="block text-[#C9A227]">khách sạn</span>
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-lg text-sm leading-7 text-gray-600 sm:text-base">
              Khám phá những món ăn đặc trưng được chế biến từ những nguyên liệu tươi ngon, mang đến trải nghiệm ẩm thực
              tinh tế và đáng nhớ trong suốt kỳ nghỉ của bạn.
            </p>

            {/* Button */}
            <button
              type="button"
              onClick={() => navigate('/catering')}
              className="
                
            rounded-xl
            bg-gray-800
            px-6
            py-3
            text-white
            transition-colors
            duration-300
           
                hover:border-[#C9A227]
                hover:bg-[#C9A227]
              "
            >
              Xem thực đơn &raquo;
            </button>
          </div>

          {/* Right-FoodCard */}
          <div>
            {featuredFoods.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4 py-10">
                {featuredFoods.map((food: FoodItem) => (
                  <FoodCard key={food._id} food={food} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-sm text-gray-500">Đang tải danh sách món ăn...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FoodsOrder
