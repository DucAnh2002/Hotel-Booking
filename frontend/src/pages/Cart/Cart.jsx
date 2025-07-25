import { useEffect, useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { RoomContext, FoodContext } from '../../context/index.js'
import './Cart.css'
const Cart = () => {
  const { isAuthenticated } = useAuth0()
  const { myBookings, getMyBookings, removeFromBooking, getRoomTotalPrice, getRoomPrice } = useContext(RoomContext)
  const { myFoodOrders, getMyfoodOrders, removeFoodFromCart, getFoodTotalPrice, getFoodPrice } = useContext(FoodContext)

  const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

  useEffect(() => {
    if (isAuthenticated) {
      getMyBookings()
      getMyfoodOrders()
    }
  }, [isAuthenticated])

  return (
    <div className="cart-container">
      {/* Nếu không có phòng và không có đồ ăn */}
      {myBookings.length === 0 && myFoodOrders.length === 0 && <p>Bạn chưa có đơn hàng nào.</p>}

      {/* Nếu có đơn đặt phòng */}
      {myBookings.length > 0 && (
        <>
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
                    <p>{getRoomPrice(booking).toLocaleString()}đ</p>
                  </div>
                </div>
                <div className="cart-delete-item">
                  <button onClick={() => removeFromBooking(booking._id)}>Xóa</button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Nếu có món ăn */}
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
                  <p>
                    <strong>Giá:</strong> {getFoodPrice(item).toLocaleString()}đ
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

      {/* Tổng tiền nếu có đơn hàng */}
      {(myBookings.length > 0 || myFoodOrders.length > 0) && (
        <>
          <hr />
          <div className="cart-total">
            <div>
              <h3>Tổng tiền thanh toán:</h3>
              <p>
                <strong>{(getRoomTotalPrice() + getFoodTotalPrice()).toLocaleString()}đ</strong>
              </p>
            </div>
            <div>
              <h2>Thanh toán</h2>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
