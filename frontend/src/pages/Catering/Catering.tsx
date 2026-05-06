import { useContext } from 'react'
import { FoodContext } from '../../context'
import FloatingCart from '../../components/feature/cart/FloatingCart'
import FoodCard from '../../components/feature/food/FoodCard'
import type { FoodItem, FoodContextType } from '../../types/foodTypes'

const Catering: React.FC = () => {
  const { foodList } = useContext(FoodContext) as FoodContextType
  const isLoading = !foodList || foodList.length === 0
  return (
    <div className="pt-24 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900">Thực đơn khách sạn</h2>
        <p className="max-w-xl mx-auto text-gray-500 text-sm sm:text-base">
          Trải nghiệm ẩm thực đa dạng với những món ăn được chế biến từ nguyên liệu tươi ngon.
        </p>
      </div>
      {/* Food list (Grid)*/}
      <div
        className="grid grid-cols-1
      sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {Array.isArray(foodList) && foodList.length > 0 ? (
          foodList.map((food: FoodItem) => <FoodCard key={food._id} food={food} />)
        ) : (
          <p className="text-center text-gray-400 col-span-full">Đang tải danh sách món ăn...</p>
        )}
      </div>

      {/* Floating cart */}
      <FloatingCart />
    </div>
  )
}

export default Catering
