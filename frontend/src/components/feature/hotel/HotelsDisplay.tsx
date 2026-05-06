import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import HotelCard from './HotelCard'
import { RoomContext } from '../../../context'
import type { RoomType } from '../../../types/roomType'

const HotelsDisplay: React.FC = () => {
  const navigate = useNavigate()
  const { roomList } = useContext(RoomContext) as { roomList: RoomType[] }

  return (
    <div
      className="
  py-12 px-4 max-w-6xl mx-auto text-center 
      "
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-3">Không gian lưu trú lý tưởng</h2>

      <p className="max-w-xl mx-auto mb-8 text-gray-600 text-sm sm:text-base">
        Trải nghiệm phòng nghỉ cao cấp với đầy đủ tiện nghi và thiết kế hiện đại.
      </p>
      {/* Grid convert */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg-grid-cols-4 gap-6 ">
        {Array.isArray(roomList) && roomList.length > 0 ? (
          roomList.slice(0, 4).map((room: RoomType) => <HotelCard key={room._id} hotel={room} />)
        ) : (
          <p className="text-gray-500 animate-pulse">Đang tải danh sách phòng...</p>
        )}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/rooms')}
          className="
            mt-10 px-6 bg-black text-white rounded-xl hover:bg-gray-800 transition
          "
        >
          Xem thêm khách sạn &raquo;
        </button>
      </div>
    </div>
  )
}

export default HotelsDisplay
