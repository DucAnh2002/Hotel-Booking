import { useContext } from 'react'
import { FoodContext } from '../../context'
import FloatingCart from '../../components/feature/cart/FloatingCart'
import FoodCard from '../../components/feature/food/FoodCard'
import type { FoodItem, FoodContextType } from '../../types/foodTypes'

const Catering: React.FC = () => {
  const { foodList } = useContext(FoodContext) as FoodContextType

  return (
    <div className="pt-[120px] px-5 max-w-[1200px] mx-auto text-center">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-4 text-gray-900">Thực đơn khách sạn</h2>

      {/* Description */}
      <p className="max-w-[900px] mx-auto mb-10 text-gray-600 leading-relaxed text-base">
        Các món ăn tại khách sạn mang đến một bầu không khí sang trọng và một loạt các trải nghiệm ẩm thực đa dạng.
        Khách hàng có thể thưởng thức nhiều món ăn khác nhau như Hàn Quốc, Trung Quốc, Nhật Bản, phương Tây và các món
        truyền thống được chế biến chuyên nghiệp bởi các đầu bếp lành nghề.
      </p>

      {/* Food list */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
        {Array.isArray(foodList) && foodList.length > 0 ? (
          foodList.map((food: FoodItem) => <FoodCard key={food._id} food={food} />)
        ) : (
          <p className="text-gray-500 col-span-full">Đang tải danh sách món ăn...</p>
        )}
      </div>

      {/* Floating cart */}
      <FloatingCart />
    </div>
  )
}

export default Catering
