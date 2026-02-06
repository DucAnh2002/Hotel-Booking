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
    <div className="fixed top-0 left-0 w-screen h-screen  bg-black/50 flex items-center justify-center z-[999]">
      <div className="bg-white p-2  rounded-[10px] w-[90%] max-w-[360px] h-[85%] max-h-[900px] shadow-[0_4px_10px_rgba(0,0,0,0.3)] text-[0.95rem] flex flex-col items-center animate-[fadeIn_0.3s_ease-in-out]">
        <h2 className="!text-[1.2rem] font-bold !mb-2 text-center ">{food.name}</h2>

        <img
          src={`${url}/upload/foods/${food.image}`}
          alt={food.name}
          className="w-full rounded-lg mb-2 max-h-[150px] object-cover"
        />

        {food.description && <p className="!mb-0 text-center">{food.description}</p>}

        <p className="!mb-0 text-center">Tổng giá: {foodTotalPrice.toLocaleString()} VND</p>

        {/* Form Group */}
        <div className="!mb-1 w-full">
          <label className="font-medium">Số lượng</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            className="w-full text-[0.9rem] p-2 border border-gray-300 rounded-md mt-1"
          />

          <label className="font-medium">Ngày giao</label>
          <input
            type="date"
            value={deliveryDate}
            onChange={e => setDeliveryDate(e.target.value)}
            className="w-full text-[0.9rem] p-2 border border-gray-300 rounded-md mt-1"
          />

          <label className="font-medium">Thời gian giao</label>
          <input
            type="time"
            value={deliveryTime}
            onChange={e => setDeliveryTime(e.target.value)}
            className="w-full text-[0.9rem] p-2 border border-gray-300 rounded-md mt-1"
          />

          <label className="font-medium">Ghi chú</label>
          <textarea
            rows={2}
            value={note}
            onChange={e => setNote(e.target.value)}
            className="w-full text-[0.9rem] p-2 border border-gray-300 rounded-md mt-1 resize-y min-h-[60px]"
          />
        </div>

        {/* Button Group */}
        <div className="flex justify-between w-full mt-1 gap-5">
          <button
            onClick={handleConfirmOrder}
            className="rounded-lg bg-green-600 px-4 py-2 
              text-sm font-medium text-white 
              transition hover:bg-green-800 
              focus:outline-none focus:ring-2 focus:ring-blue-300
              hover:scale-120"
          >
            Xác nhận
          </button>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-600 px-4 py-2 
              text-sm font-medium text-black 
              transition hover:bg-red-900 
              focus:outline-none focus:ring-2 focus:ring-red-900
              hover:scale-120"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  )
}

export default FoodOrderModal
