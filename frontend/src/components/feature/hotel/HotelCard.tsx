import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import BookingModal from '../../../components/feature/booking/roomBookingModel'
import Stars from '../../feature/hotel/Stars'
import type { RoomType } from '../../../types/roomType'

interface Props {
  hotel: RoomType
}

const HotelCard: React.FC<Props> = ({ hotel }) => {
  const [isBooking, setIsBooking] = useState(false)
  const { isAuthenticated, loginWithRedirect } = useAuth0()
  const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

  // Xử lý đường dẫn ảnh backend/local
  const imageSrc = hotel.image.startsWith('http') ? hotel.image : `${backendURL}/upload/rooms/${hotel.image}`

  const handleBookNow = async () => {
    if (!isAuthenticated) {
      await loginWithRedirect()
      return
    }
    setIsBooking(true)
  }

  return (
    <>
      <div
        className="
         bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col
        "
      >
        <div className="overflow-hidden">
          <img
            src={imageSrc}
            alt={hotel.roomType}
            className="w-full h-[200px] object-cover trasition duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{hotel.roomType}</h3>

          <Stars count={hotel.rating} />

          <p className="text-sm text-gray-500 line-clamp-1 mb-2">{hotel.address}</p>

          <p className="text-lg font-bold text-green-600 mb-4">
            {hotel.price.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND'
            })}
          </p>

          <button
            onClick={handleBookNow}
            className="
           mt-auto w-full py-2 bg-red-500 text-white rounded-xl hover:bg-red-700 transition active:scale-95
          "
          >
            Book Now
          </button>
        </div>
      </div>
      {isBooking && <BookingModal hotel={hotel} onClose={() => setIsBooking(false)} />}
    </>
  )
}

export default HotelCard
