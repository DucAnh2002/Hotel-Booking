import { useState, useContext } from 'react'
import { toast } from 'react-toastify'
import { RoomContext } from '../../../context'
import type { RoomType } from '../../../types/roomType'

interface BookingModalProps {
  hotel: RoomType
  onClose: () => void
}

const BookingModal: React.FC<BookingModalProps> = ({ hotel, onClose }) => {
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [guests, setGuests] = useState(1)
  const today = new Date().toISOString().split('T')[0]

  const { bookRoom, addToBookingCart } = useContext(RoomContext)

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
      await bookRoom({
        roomId: hotel._id,
        checkInDate,
        checkOutDate,
        guests
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
          w-full max-w-fit h-full max-h-120
          rounded-xl bg-white p-6 shadow-lg 
          animate-[fadeIn_0.3s_ease-in-out]
        "
      >
        <h2 className="mb-2.5 bg-gray-400 text-[28px] text-center font-bold">Đặt phòng: {hotel?.roomType}</h2>

        <div>
          <label className=" mb-[15px]  block font-bold">Ngày nhận phòng</label>
          <input
            type="date"
            value={checkInDate}
            min={today} // Điều kiện chỉ chọn ngày từ hôm nay trở đi
            onChange={e => {
              setCheckInDate(e.target.value)
              setCheckOutDate('') // Reset ngày trả phòng khi ngày nhận phòng thay đổi
            }}
            className="
              w-full rounded-md border border-gray-300 px-3 py-2 
              outline-none focus:border-blue-500 
              focus:ring-1 focus:ring-blue-300
            "
          />
        </div>

        <div>
          <label className=" block font-bold">Ngày trả phòng</label>
          <input
            type="date"
            value={checkOutDate}
            min={checkInDate || today} // Ngày trả phòng phải sau ngày nhận phòng
            onChange={e => setCheckOutDate(e.target.value)}
            className="
              w-full rounded-md border border-black-300 px-3 py-2 
              outline-none focus:border-blue-500 
              focus:ring-1 focus:ring-blue-300
            "
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-bold">Số khách</label>
          <input
            type="number"
            min="1"
            value={guests}
            onChange={e => setGuests(Number(e.target.value))}
            className="
              w-full max-w-[120px] rounded-md border border-gray-300 
              px-3 py-2 outline-none 
              focus:border-blue-500 focus:ring-1 focus:ring-blue-300
            "
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handleConfirmBooking}
            className="
              rounded-lg bg-green-600 px-4 py-2 
              text-sm font-medium text-white 
              transition hover:bg-green-800 
              focus:outline-none focus:ring-2 focus:ring-blue-300
              hover:scale-120
            "
          >
            Xác nhận
          </button>

          <button
            onClick={onClose}
            className="
              rounded-lg bg-red-600 px-4 py-2 
              text-sm font-medium text-black 
              transition hover:bg-red-900 
              focus:outline-none focus:ring-2 focus:ring-red-900
              hover:scale-120
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
