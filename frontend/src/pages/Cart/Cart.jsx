import { useEffect, useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import './Cart.css'
import { RoomContext, FoodContext } from '../../context/index.js'

const Cart = () => {
  const { isAuthenticated } = useAuth0()
  const { myBookings, getMyBookings, removeFromBooking } = useContext(RoomContext)
  const { myFoodOrders, getMyfoodOrders, removeFoodFromCart } = useContext(FoodContext)
  const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

  useEffect(() => {
    if (isAuthenticated) {
      getMyBookings()
      getMyfoodOrders()
    }
  }, [isAuthenticated])

  if (!myBookings.length) return <p>Bạn chưa đặt phòng nào.</p>

  return (
    <div className="cart-container">
      <h2>Thông tin đặt phòng</h2>
      {myBookings.map((booking, index) => (
        <div key={index} className="cart-booking">
          <img src={`${url}/upload/rooms/${booking.roomId.image}`} alt="ảnh phòng" className="cart-img" />
          <div className="cart-info-with-delete">
            <div className="cart-info">
              <div className="cart-info-item">
                <p className="label">Loại phòng:</p>
                <p>{booking.roomId.roomType}</p>
              </div>
              <div className="cart-info-item">
                <p className="label">Số người:</p>
                <p>{booking.guests}</p>
              </div>
              <div className="cart-info-item">
                <p className="label">Check-in:</p>
                <p>{new Date(booking.checkInDate).toLocaleDateString('vi-VN')}</p>
              </div>
              <div className="cart-info-item">
                <p className="label">Check-out:</p>
                <p>{new Date(booking.checkOutDate).toLocaleDateString('vi-VN')}</p>
              </div>
              <div className="cart-info-item">
                <p className="label">Giá:</p>
                <p>{booking.roomId.price.toLocaleString()}đ</p>
              </div>
            </div>
            <div className="cart-delete-item">
              <button onClick={() => removeFromBooking(booking._id)}>Xóa</button>
            </div>
          </div>
        </div>
      ))}

      {myFoodOrders.length > 0 && (
        <>
          <hr />
          <h2>Đồ ăn đã đặt</h2>
          {myFoodOrders.map((item, index) => (
            <div key={index} className="cart-food-item">
              <img src={`${url}/upload/foods/${item.image}`} alt={item.name} className="cart-img" />
              <div className="cart-info-with-delete">
                <div className="cart-food-info">
                  <p>
                    <strong>Món ăn:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Số lượng:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Giao lúc:</strong> {item.deliveryTime} | Ngày{' '}
                    {new Date(item.deliveryDate).toLocaleDateString('vi-VN')}
                  </p>
                  <p>
                    <strong>Ghi chú:</strong> {item.note}
                  </p>
                </div>
                <div className="cart-delete-item">
                  <button onClick={() => removeFoodFromCart(item._id)}>Xóa</button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      <hr />
      <div className="cart-total">{/* Tổng tiền nếu cần */}</div>
    </div>
  )
}

export default Cart
