import { useState, useContext } from 'react'
import { FoodContext } from '../../../context'

// Import type đã khai báo
import type { FoodItem, FoodContextType, OrderFoodInput } from '../../../types/foodTypes'

interface FoodOrderModalProps {
  food: FoodItem
  onClose: () => void
}

const FoodOrderModal: React.FC<FoodOrderModalProps> = ({ food, onClose }) => {
  const [quantity, setQuantity] = useState<number>(1)
  const [deliveryDate, setDeliveryDate] = useState<string>('')
  const [deliveryTime, setDeliveryTime] = useState<string>('')
  const [note, setNote] = useState<string>('')

  // ép context theo type đúng
  const { orderFood } = useContext(FoodContext) as FoodContextType

  const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

  const handleConfirmOrder = async () => {
    if (quantity < 1) return

    const orderData: OrderFoodInput = {
      name: food.name,
      image: food.image,
      price: food.price,
      quantity,
      deliveryDate,
      deliveryTime,
      note
    }

    try {
      await orderFood(orderData)
      onClose()
    } catch (err) {
      console.error('❌ Lỗi khi đặt món ăn:', err)
    }
  }

  const foodTotalPrice = food.price * quantity

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <div
        className="bg-white w-full max-w-[380px] rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto flex flex-col items-center animate-[fadeIn_0.3s_ease-in-out]"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-2 text-center">{food.name}</h2>

        <img
          src={`${url}/upload/foods/${food.image}`}
          alt={food.name}
          className="w-full h-[150px] object-cover rounded-xl mb-3"
        />

        {food.description && <p className="text-sm text-gray-600 text-center mb-2">{food.description}</p>}

        <p className="text-center font-semibold mb-4">Tổng giá: {foodTotalPrice.toLocaleString()} VND</p>

        {/* Form Group */}
        <div className="w-full space-y-3">
          <label className="block text-sm font-medium mb-1">Số lượng</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <label className="block text-sm font-medium mb-1">Ngày giao</label>
          <input
            type="date"
            value={deliveryDate}
            onChange={e => setDeliveryDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <label className="block text-sm font-medium mb-1">Thời gian giao</label>
          <input
            type="time"
            value={deliveryTime}
            onChange={e => setDeliveryTime(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <label className="block text-sm font-medium mb-1">Ghi chú</label>
          <textarea
            rows={2}
            value={note}
            onChange={e => setNote(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Button Group */}
        <div className="flex w-full mt-5 gap-3">
          <button
            onClick={handleConfirmOrder}
            className="flex-1 bg-green-600 text-white py-3 rounded-xl transition hover:bg-green-700 active:scale-95 "
          >
            Xác nhận
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-red-500 text-white py-3 rounded-xl transition hover:bg-red-700 active:scale-95"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  )
}

export default FoodOrderModal
