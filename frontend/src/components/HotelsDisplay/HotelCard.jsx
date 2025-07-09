import { useState } from 'react'
import Stars from './Stars.jsx'
import BookingModal from '../Booking/roomBookingModel.jsx'
import { useAuth0 } from '@auth0/auth0-react'
import './HotelCard.css'
const HotelCard = ({ hotel }) => {
  const [isBooking, setIsBooking] = useState(false)
  const { image, roomType, rating, address, price } = hotel
  const { isAuthenticated, loginWithRedirect } = useAuth0()

  const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

  const handleBookNow = async () => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!isAuthenticated) {
      await loginWithRedirect() // chuyển hướng người dùng đến trang đăng nhập Auth0
    } else {
      setIsBooking(true) // Mở modal đặt phòng
    }
  }

  return (
    <>
      <div className="hotel-card">
        <img src={`${url}/upload/rooms/${image}`} alt={roomType} className="hotel-image" />
        <h3 className="room-type">{roomType}</h3>
        <Stars count={rating} />
        <p className="address">{address}</p>
        <p className="price">
          {price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
          })}
        </p>
        <button className="book-button" onClick={handleBookNow}>
          Book Now
        </button>
      </div>

      {isBooking && <BookingModal hotel={hotel} onClose={() => setIsBooking(false)} />}
    </>
  )
}
export default HotelCard
