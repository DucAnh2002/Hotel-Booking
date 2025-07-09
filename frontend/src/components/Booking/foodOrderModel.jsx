import { useState, useContext } from 'react'
import { FoodContext } from '../../context/index.js'
import './foodOrderModel.css'

const FoodOrderModal = ({ food, onClose }) => {
  const [quantity, setQuantity] = useState(1) // ✅ Khai báo quantity
  const [deliveryDate, setDeliveryDate] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('')
  const [note, setNote] = useState('')
  const { orderFood } = useContext(FoodContext)
  const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

  const handleConfirmOrder = async () => {
    if (quantity < 1) return

    try {
      await orderFood({
        name: food.name,
        image: food.image,
        price: food.price,
        quantity, // ✅ quantity đã khai báo
        deliveryDate,
        deliveryTime,
        note
      })
      onClose()
    } catch (err) {
      console.error('❌ Lỗi khi đặt món ăn:', err)
    }
  }

  const foodTotalPrice = food.price * quantity
  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal">
        <h2>{food.name}</h2>
        <img src={`${url}/upload/foods/${food.image}`} alt={food.name} className="food-img" />

        <p>{food.description}</p>
        <p className="food-price">Tổng giá: {foodTotalPrice.toLocaleString()} VND </p>

        <div className="form-group">
          <label>Số lượng</label>
          <input type="number" min="1" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
        </div>

        <div className="form-group">
          <label>Ngày giao</label>
          <input type="date" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Thời gian giao</label>
          <input type="time" value={deliveryTime} onChange={e => setDeliveryTime(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Ghi chú</label>
          <textarea value={note} onChange={e => setNote(e.target.value)} rows="2" />
        </div>

        <div className="button-group">
          <button className="confirm-btn" onClick={handleConfirmOrder}>
            Xác nhận
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  )
}

export default FoodOrderModal
