import { useState, useContext } from 'react'
import { toast } from 'react-toastify'
import './roomBookingModel.css'
import { RoomContext } from '../../context/index.js'

const BookingModal = ({ hotel, onClose }) => {
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [guests, setGuests] = useState(1)

  const { bookRoom, addToBookingCart } = useContext(RoomContext)

  const handleConfirmBooking = async () => {
    if (!checkInDate || !checkOutDate) {
      toast.error('Vui lòng chọn ngày nhận và trả phòng.')
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
      // toast.success('Đặt phòng thành công!')
      onClose()
    } catch (err) {
      console.error('Lỗi khi đặt phòng:', err)
      //toast.error('Không thể đặt phòng. Vui lòng thử lại.')
    }
  }

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal">
        <h2>Đặt phòng: {hotel.roomType}</h2>

        <div className="form-group">
          <label>Ngày nhận phòng</label>
          <input type="date" value={checkInDate} onChange={e => setCheckInDate(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Ngày trả phòng</label>
          <input type="date" value={checkOutDate} onChange={e => setCheckOutDate(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Số khách</label>
          <input type="number" min="1" value={guests} onChange={e => setGuests(Number(e.target.value))} />
        </div>

        <div className="button-group">
          <button className="confirm-btn" onClick={handleConfirmBooking}>
            Xác nhận
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Huỷ
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingModal
