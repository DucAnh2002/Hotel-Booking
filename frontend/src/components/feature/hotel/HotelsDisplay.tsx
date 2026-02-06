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
        bg-[url('/background4.jpg')]
        bg-cover bg-no-repeat bg-center bg-fixed
        p-5
        max-w-full mx-auto
        font-sans
        bg-[#f5f7fa]
        text-[#333]
      "
    >
      <h2 className="text-2xl text-center font-bold mb-2.5 text-black bg-black/40 py-2">
        Lựa chọn không gian lưu trú lý tưởng dành riêng cho bạn
      </h2>

      <p className="text-[1.5rem] text-center mb-8 font-medium text-[#030303] bg-black/40 max-w-4xl mx-auto">
        Trải nghiệm sự thoải mái và đẳng cấp qua các hạng phòng đa dạng. Từ phòng tiêu chuẩn hiện đại đến suite sang
        trọng với tầm nhìn tuyệt đẹp. Mỗi hạng phòng được thiết kế tinh tế, trang bị tiện nghi cao cấp, mang đến kỳ nghỉ
        hoàn hảo cho mọi nhu cầu của bạn.
      </p>

      <div className="flex flex-wrap gap-5 justify-center">
        {Array.isArray(roomList) && roomList.length > 0 ? (
          roomList.slice(0, 4).map((room: RoomType) => <HotelCard key={room._id} hotel={room} />)
        ) : (
          <p className="text-lg text-gray-700 animate-pulse">Đang tải danh sách phòng...</p>
        )}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/rooms')}
          className="
            text-lg font-semibold px-6 py-3
            bg-gray-950 text-white rounded-lg shadow-md
            hover:bg-gray-900 transition-all
          "
        >
          Xem thêm khách sạn &raquo;
        </button>
      </div>
    </div>
  )
}

export default HotelsDisplay
