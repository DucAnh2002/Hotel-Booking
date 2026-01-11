import { useContext } from 'react'
import { RoomContext } from '../../context'
import HotelCard from '../../components/feature/hotel/HotelCard'
import FloatingCart from '../../components/feature/cart/FloatingCart'

// import type { RoomType } from '../../types/roomType'
// import type { BookingType } from '../../types/bookingType'

const Room: React.FC = () => {
  const { roomList } = useContext(RoomContext)

  return (
    <div className="pt-25 ">
      <h2 className="text-center text-[28px] font-bold mb-1.5 text-[#333]">
        Lựa chọn không gian lưu trú lý tưởng dành riêng cho bạn
      </h2>

      <p className="text-center font-semibold mx-6 mb-[30px] text-[20px] text-[#555] leading-[1.6]  ">
        Trải nghiệm sự thoải mái và đẳng cấp qua các hạng phòng đa dạng – từ phòng tiêu chuẩn hiện đại đến suite sang
        trọng với tầm nhìn tuyệt đẹp. Mỗi hạng phòng được thiết kế tinh tế, trang bị tiện nghi cao cấp, mang đến kỳ nghỉ
        hoàn hảo cho mọi nhu cầu của bạn.
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
        {Array.isArray(roomList) && roomList.length > 0 ? (
          roomList.map(room => <HotelCard key={room._id} hotel={room} />)
        ) : (
          <p>Đang tải danh sách phòng...</p>
        )}
      </div>

      <FloatingCart />
    </div>
  )
}

export default Room
