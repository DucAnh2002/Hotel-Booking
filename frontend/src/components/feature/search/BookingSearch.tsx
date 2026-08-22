import { useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BedDouble, CalendarDays, Search, Users } from 'lucide-react'

import { RoomContext } from '../../../context'
import type { RoomContextType } from '../../../types/room-context.type'
import type { BookingSearchState } from './booking.types'
import { MIN_GUESTS, MAX_GUESTS } from './booking.constants'
import {
  formatDate,
  addDays,
  isAfterDate,
  getDefaultSearchState,
  validateSearch,
  buildSearchQuery,
  buildRoomSearchParams
} from './booking.utils'
import { toast } from 'react-toastify'

import { Minus, Plus } from 'lucide-react'

const BookingSearch = () => {
  const { roomList } = useContext(RoomContext) as RoomContextType
  const navigate = useNavigate()

  const [searchData, setSearchData] = useState(getDefaultSearchState())

  const handleChange = <K extends keyof BookingSearchState>(field: K, value: BookingSearchState[K]) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCheckInchange = (value: string) => {
    setSearchData(prev => {
      let nextCheckOut = prev.checkInDate

      // Nếu checkout <= checkin thì tự động chuyển checkout sang ngày tiếp theo
      if (!isAfterDate(value, prev.checkOutDate)) {
        nextCheckOut = addDays(value, 1)
      }
      return {
        ...prev,
        checkInDate: value,
        checkOutDate: nextCheckOut
      }
    })
  }

  const handleCheckoutChange = (value: string) => {
    if (!isAfterDate(searchData.checkInDate, value)) {
      toast.warning('Ngày trả phòng phải sau ngày nhận phòng!')
      return
    }
    handleChange('checkOutDate', value)
  }
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

  const increaseGuests = () => {
    setSearchData(prev => ({
      ...prev,
      guests: Math.min(prev.guests + 1, MAX_GUESTS)
    }))
  }

  const decreaseGuests = () => {
    setSearchData(prev => ({
      ...prev,
      guests: Math.max(prev.guests - 1, MIN_GUESTS)
    }))
  }

  const handleSearch = () => {
    if (!validateSearch(searchData)) return

    const params = buildRoomSearchParams({
      roomType: searchData.roomId ? (roomTypes.find(room => room._id === searchData.roomId)?.roomType ?? '') : '',
      checkInDate: searchData.checkInDate,
      checkOutDate: searchData.checkOutDate,
      guests: searchData.guests
    })

    navigate(`/rooms?${params.toString()}`)

    const query = buildSearchQuery(searchData)
    navigate(`/rooms?${query}`)
  }

  return (
    <section className="relative z-40 mx-auto w-full max-w-7xl px-5 py-2 sm:px-6 lg:px-8 lg:py-4">
      <div
        className="
          rounded-3xl
          border
          border-white/40
          bg-blue-50/40
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
          <div className="space-y-3 border-amber-500">
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
                value={searchData.roomId}
                onChange={e => handleChange('roomId', e.target.value)}
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
                min={formatDate(new Date())}
                value={searchData.checkInDate}
                onChange={e => handleCheckInchange(e.target.value)}
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
                min={addDays(searchData.checkInDate, 1)}
                value={searchData.checkOutDate}
                onChange={e => handleCheckoutChange(e.target.value)}
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
              <Users size={18} className="text-amber-500" />

              {/* <div className="flex items-center justify-between rounded-xl border border-gray-200 px-3 py-2"> */}
              <button
                type="button"
                onClick={decreaseGuests}
                disabled={searchData.guests <= MIN_GUESTS}
                className="rounded-lg p-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus size={10} />
              </button>

              <span className="text-lg font-semibold">{searchData.guests}</span>

              <button
                type="button"
                onClick={increaseGuests}
                disabled={searchData.guests >= MAX_GUESTS}
                className="rounded-lg p-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus size={10} />
              </button>
              {/* </div> */}
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              type="button"
              onClick={handleSearch}
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
