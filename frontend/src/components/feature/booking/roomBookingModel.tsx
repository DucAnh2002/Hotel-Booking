import { useState, useContext } from 'react'
import { toast } from 'react-toastify'
import { RoomContext } from '../../../context'
import type { RoomType } from '../../../types/roomType'
import { useNavigate } from 'react-router-dom'
interface BookingModalProps {
  hotel: RoomType
  onClose: () => void
}

const BookingModal: React.FC<BookingModalProps> = ({ hotel, onClose }) => {
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [guests, setGuests] = useState(1)
  const today = new Date().toISOString().split('T')[0]
  const navigate = useNavigate()
  const { addToBookingCart } = useContext(RoomContext)

  const handleConfirmBooking = async () => {
    if (!checkInDate || !checkOutDate) {
      toast.error('Vui lòng chọn ngày nhận và trả phòng.')
      return
    }

    if (!hotel || !hotel._id) {
      toast.error('Không có phòng để đặt.')
      return
    }

    try {
      navigate(`/checkout/${hotel._id}`, {
        state: {
          checkInDate,
          checkOutDate,
          guests
        }
      })

      addToBookingCart(hotel._id)
      onClose()
    } catch (err) {
      console.error('Lỗi khi đặt phòng:', err)
      toast.error('Không thể đặt phòng. Vui lòng thử lại.')
    }
  }

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center 
        bg-black/50
      "
      role="dialog"
      aria-modal="true"
      aria-label={`Đặt phòng ${hotel?.roomType ?? ''}`}
    >
      <div
        className="
          w-full max-w-md  max-h-[90vh] overflow-y-auto
          rounded-2xl bg-white p-6 shadow-xl 
          animate-[fadeIn_0.3s_ease-in-out]
        "
      >
        {/* title */}
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">Đặt phòng: {hotel?.roomType}</h2>
        {/* check-in */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Ngày nhận phòng</label>
          <input
            type="date"
            value={checkInDate}
            min={today} // Điều kiện chỉ chọn ngày từ hôm nay trở đi
            onChange={e => {
              setCheckInDate(e.target.value)
              setCheckOutDate('') // Reset ngày trả phòng khi ngày nhận phòng thay đổi
            }}
            className="
              w-full rounded-lg border px-3 py-2 
              focus:ring-2 focus:ring-blue-400 outline-none
            "
          />
        </div>
        {/* check-out */}
        <div className="mb-4">
          <label className=" block font-medium mb-1">Ngày trả phòng</label>
          <input
            type="date"
            value={checkOutDate}
            min={checkInDate || today} // Ngày trả phòng phải sau ngày nhận phòng
            onChange={e => setCheckOutDate(e.target.value)}
            className="
              w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none
            "
          />
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-1">Số khách</label>
          <input
            type="number"
            min="1"
            value={guests}
            onChange={e => setGuests(Number(e.target.value))}
            className="
              w-full max-w-[120px] rounded-lg  border px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none
            "
          />
        </div>
        {/* button */}
        <div className="flex gap-3">
          <button
            onClick={handleConfirmBooking}
            className="
              flex-1 bg-green-600 text-white py-3 rounded-xl transition hover:bg-green-700 active:scale-95
            "
          >
            Xác nhận
          </button>

          <button
            onClick={onClose}
            className="
              flex-1 bg-red-500 text-white py-3 rounded-xl transition hover:bg-red-700 active-scale-95
            "
          >
            Huỷ
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingModal
