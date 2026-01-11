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
          bg-zinc-200
          rounded-[10px]
          shadow-[0_4px_10px_rgba(0,0,0,0.1)]
          w-[250px]
          p-4
          flex flex-col items-center
          transition-shadow duration-300
          hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)]
        "
      >
        <img src={imageSrc} alt={hotel.roomType} className="w-full h-[200px] object-cover rounded-[8px] mb-3" />

        <div className="font-bold text-[1.2rem] mb-2 text-[#444] text-center">{hotel.roomType}</div>

        <Stars count={hotel.rating} />

        <p className="italic text-[0.9rem] text-[#666] mb-[14px] text-center">{hotel.address}</p>

        <p className="text-[1.25rem] font-bold text-[#27ae60] mb-3 text-center">
          {hotel.price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
          })}
        </p>

        <button
          onClick={handleBookNow}
          className="
            bg-[#ff6f61]
            w-full
            text-zinc-600
            font-bold
            px-[18px] py-[10px]
            text-[1rem] 
            rounded-[6px]
            cursor-pointer
            select-none
            transition-colors duration-300
            hover:bg-[#a92f24] hover:text-white
          "
        >
          Book Now
        </button>
      </div>

      {isBooking && <BookingModal hotel={hotel} onClose={() => setIsBooking(false)} />}
    </>
  )
}

export default HotelCard
