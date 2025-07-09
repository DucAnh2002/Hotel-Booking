import { useContext } from 'react'
import { RoomContext } from '../../context/index.js'
import HotelCard from '../../components/HotelsDisplay/HotelCard.jsx'
import FloatingCart from '../../components/FloatingCart/FloatingCart.jsx'
const Room = () => {
  const { roomList, bookingCart } = useContext(RoomContext)

  return (
    <div className="hotels-display-container">
      <h2>Lựa chọn không gian lưu trú lý tưởng dành riêng cho bạn</h2>
      <p>
        Trải nghiệm sự thoải mái và đẳng cấp qua các hạng phòng đa dạng – từ phòng tiêu chuẩn hiện đại đến suite sang
        trọng với tầm nhìn tuyệt đẹp. Mỗi hạng phòng được thiết kế tinh tế, trang bị tiện nghi cao cấp, mang đến kỳ nghỉ
        hoàn hảo cho mọi nhu cầu của bạn.
      </p>
      <div className="hotels-list">
        {Array.isArray(roomList) && roomList.length > 0 ? (
          roomList.map(room => <HotelCard key={room._id} hotel={room} />)
        ) : (
          <p> Đang tải danh sách phòng</p>
        )}
      </div>
      <FloatingCart cart={bookingCart} />
    </div>
  )
}

export default Room
