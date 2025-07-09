import { useContext } from 'react'
import './HotelsDisplay.css'
import { useNavigate } from 'react-router-dom'
import HotelCard from './HotelCard.jsx'
import { RoomContext } from '../../context/index.js'
const HotelsDisplay = () => {
  const navigate = useNavigate()
  const { roomList } = useContext(RoomContext)

  return (
    <div className="hotels-display-container">
      <h2>Lựa chọn không gian lưu trú lý tưởng dành riêng cho bạn</h2>
      <p>
        Trải nghiệm sự thoải mái và đẳng cấp qua các hạng phòng đa dạng. Từ phòng tiêu chuẩn hiện đại đến suite sang
        trọng với tầm nhìn tuyệt đẹp. Mỗi hạng phòng được thiết kế tinh tế, trang bị tiện nghi cao cấp, mang đến kỳ nghỉ
        hoàn hảo cho mọi nhu cầu của bạn.
      </p>
      <div className="hotels-list">
        {Array.isArray(roomList) && roomList.length > 0 ? (
          roomList.slice(0, 4).map(room => <HotelCard key={room._id} hotel={room} />)
        ) : (
          <p> Đang tải danh sách phòng</p>
        )}
      </div>
      <div className="see-more">
        <button onClick={() => navigate('/rooms')}>Xem thêm khách sạn &raquo;</button>
      </div>
    </div>
  )
}
export default HotelsDisplay
