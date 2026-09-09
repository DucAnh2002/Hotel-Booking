import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import HotelCard from './HotelCard'

import { RoomContext } from '../../../context'

import type { RoomType } from '../../../types/room.type'

const FEATURE_ROOM_LIMIT = 4

const HotelsDisplay = () => {
  const navigate = useNavigate()

  const { roomList } = useContext(RoomContext) as { roomList: RoomType[] }

  const featuredRooms = roomList.slice(0, FEATURE_ROOM_LIMIT)

  const handleViewMore = () => {
    navigate('/rooms')
  }
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8 text-center">
        <h2 className="mb-3 text-2xl font-bold sm:text-3xl">Không gian lưu trú lý tưởng</h2>

        <p className="mx-auto max-w-xl text-sm text-gray-600 sm:text-base">
          Trải nghiệm phòng nghỉ cao cấp với đầy đủ tiện nghi và thiết kế hiện đại.
        </p>
      </header>

      {/* Grid convert */}
      {featuredRooms.length > 0 ? (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featuredRooms.map(room => (
            <HotelCard key={room._id} hotel={room} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-gray-500 animate-pulse">Đang tải danh sách phòng...</p>
        </div>
      )}

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg-grid-cols-4 gap-6 ">
        {Array.isArray(roomList) && roomList.length > 0 ? (
          roomList.slice(0, 4).map((room: RoomType) => <HotelCard key={room._id} room={room} />)
        ) : (
          <p className="text-gray-500 animate-pulse">Đang tải danh sách phòng...</p>
        )}
      </div> */}

      <div className="mt-10 flex  justify-center">
        <button
          type="button"
          onClick={handleViewMore}
          className="
            rounded-xl
            bg-gray-800
            px-6
            py-3
            text-white
            transition-colors
            duration-300
           hover:border-[#C9A227]
                hover:bg-[#C9A227]"
        >
          Xem thêm phòng &raquo;
        </button>
      </div>
    </section>
  )
}

export default HotelsDisplay
