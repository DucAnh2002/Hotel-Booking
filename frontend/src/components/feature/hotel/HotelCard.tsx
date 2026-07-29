import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import BookingModal from '../../../components/feature/booking/roomBookingModel'
import Stars from '../../feature/hotel/Stars'
import type { RoomType } from '../../../types/room.type'

interface Props {
  room: RoomType
}

const HotelCard: React.FC<Props> = ({ room }) => {
  const [isBooking, setIsBooking] = useState(false)
  const { isAuthenticated, loginWithRedirect } = useAuth0()
  const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
  const BookingModalAny = BookingModal as React.ComponentType<any>

  // Xử lý đường dẫn ảnh backend/local
  const imageSrc = room.image.startsWith('http') ? room.image : `${backendURL}/upload/rooms/${room.image}`

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
            alt={room.roomType}
            className="w-full h-[200px] object-cover trasition duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{room.roomType}</h3>

          <Stars count={room.rating} />

          <p className="text-sm text-gray-500 line-clamp-1 mb-2">{room.address}</p>

          <p className="text-lg font-bold text-green-600 mb-4">
            {room.price.toLocaleString('vi-VN', {
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
      {isBooking && <BookingModalAny room={room} onClose={() => setIsBooking(false)} />}
    </>
  )
}

export default HotelCard
