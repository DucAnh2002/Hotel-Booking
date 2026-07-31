import { useContext, useMemo, useState } from 'react'
import { BedDouble, CalendarDays, Search, Users } from 'lucide-react'

import { RoomContext } from '../../../context'
import type { RoomContextType } from '../../../types/room-context.type'

const BookingSearch = () => {
  const { roomList } = useContext(RoomContext) as RoomContextType

  const [selectedRoom, setSelectedRoom] = useState('')
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [guests, setGuests] = useState(2)

  /**
   * Loại bỏ room trùng nhau.
   * Nếu backend có nhiều Deluxe Room
   * dropdown vẫn chỉ hiển thị 1 lần.
   */
  const roomTypes = useMemo(() => {
    const map = new Map()

    roomList.forEach(room => {
      if (!map.has(room.roomType)) {
        map.set(room.roomType, room)
      }
    })

    return [...map.values()]
  }, [roomList])

  return (
    <section className="relative z-40 mx-auto w-full max-w-7xl px-5">
      <div
        className="
          rounded-3xl
          border
          border-white/40
          bg-white
          p-6
          shadow-2xl
          backdrop-blur-xl
          lg:p-8
        "
      >
        {/* Search Form */}
        <div
          className="
            grid
            gap-5
            lg:grid-cols-5
            md:grid-cols-2
            grid-cols-1
          "
        >
          {/* Room Type */}
          <div className="space-y-2">
            <label htmlFor="room" className="text-sm font-semibold text-gray-700">
              Loại phòng
            </label>

            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-gray-200
                px-4
                py-3
                transition
                focus-within:border-amber-500
              "
            >
              <BedDouble size={20} className="text-amber-500" />

              <select
                id="room"
                value={selectedRoom}
                onChange={e => setSelectedRoom(e.target.value)}
                className="
                  w-full
                  bg-transparent
                  outline-none
                  text-gray-700
                "
              >
                <option value="">Tất cả loại phòng</option>

                {roomTypes.map(room => (
                  <option key={room._id} value={room._id}>
                    {room.roomType}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Check In */}
          <div className="space-y-2">
            <label htmlFor="checkIn" className="text-sm font-semibold text-gray-700">
              Nhận phòng
            </label>

            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-gray-200
                px-4
                py-3
                transition
                focus-within:border-amber-500
              "
            >
              <CalendarDays size={20} className="text-amber-500" />

              <input
                id="checkIn"
                type="date"
                value={checkInDate}
                onChange={e => setCheckInDate(e.target.value)}
                className="
                  w-full
                  bg-transparent
                  outline-none
                  text-gray-700
                "
              />
            </div>
          </div>

          {/* Check Out */}
          <div className="space-y-2">
            <label htmlFor="checkOut" className="text-sm font-semibold text-gray-700">
              Trả phòng
            </label>

            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-gray-200
                px-4
                py-3
                transition
                focus-within:border-amber-500
              "
            >
              <CalendarDays size={20} className="text-amber-500" />

              <input
                id="checkOut"
                type="date"
                value={checkOutDate}
                onChange={e => setCheckOutDate(e.target.value)}
                className="
                  w-full
                  bg-transparent
                  outline-none
                  text-gray-700
                "
              />
            </div>
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <label htmlFor="guests" className="text-sm font-semibold text-gray-700">
              Số khách
            </label>

            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-gray-200
                px-4
                py-3
                transition
                focus-within:border-amber-500
              "
            >
              <Users size={20} className="text-amber-500" />

              <input
                id="guests"
                type="number"
                min={1}
                max={10}
                value={guests}
                onChange={e => setGuests(Number(e.target.value))}
                className="
                  w-full
                  bg-transparent
                  outline-none
                  text-gray-700
                "
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              type="button"
              className="
                flex
                h-[56px]
                w-full
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-amber-500
                px-6
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-amber-600
                hover:shadow-lg
                active:scale-95
              "
            >
              <Search size={20} />
              Tìm Phòng
            </button>
          </div>
        </div>

        {/* Footer */}
      </div>
    </section>
  )
}

export default BookingSearch
