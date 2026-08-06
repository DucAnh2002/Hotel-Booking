import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import BookingModal from '../../../components/feature/booking/roomBookingModel'
import Stars from '../../feature/hotel/Stars'

import type { RoomType } from '../../../types/room.type'

import { formatCurrency } from '../../../utils/formatCurrency'
import { getRoomImage } from '../../../utils/getRoomImage'

interface HotelCardProps {
  hotel: RoomType
}

const HotelCard = ({ hotel }: HotelCardProps) => {
  const [isBooking, setIsBooking] = useState(false)

  const { isAuthenticated, loginWithRedirect } = useAuth0()

  const imageSrc = getRoomImage(hotel)
  //   const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
  const BookingModalAny = BookingModal as React.ComponentType<any>

  // Xử lý đường dẫn ảnh backend/local
  //   const imageSrc = room.image.startsWith('http') ? room.image : `${backendURL}/upload/rooms/${room.image}`

  const handleBookNow = async () => {
    if (!isAuthenticated) {
      await loginWithRedirect()
      return
    }
    setIsBooking(true)
  }

  return (
    <>
      <article
        className="
         flex flex-col
         overflow-hidden
        rounded-2xl
        bg-white
        shadow-md
        transition-shadow
        duration-300
        hover:shadow-xl
        "
      >
        <div className="overflow-hidden">
          <img
            src={imageSrc}
            alt={hotel.roomType}
            decoding="async"
            className="w-full h-[200px] object-cover trasition duration-300 hover:scale-105"
          />
        </div>
        <div className=" flex flex-col flex-1 p-4">
          <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{hotel.roomType}</h3>

          <Stars count={hotel.rating} />

          <p className="text-sm text-gray-500 line-clamp-1 mb-2">{hotel.address}</p>

          <p className="text-lg font-bold text-green-600 mb-4">{formatCurrency(hotel.price)}</p>

          <button
            type="button"
            onClick={handleBookNow}
            className="
           mt-auto w-full py-2 bg-red-500 text-white rounded-xl hover:bg-red-700 transition active:scale-95
          "
          >
            Book Now
          </button>
        </div>
      </article>
      {isBooking && <BookingModalAny room={hotel} onClose={() => setIsBooking(false)} />}
    </>
  )
}

export default HotelCard
