import { useEffect, useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { RoomContext, FoodContext } from '../../context'
import type { FoodOrder } from '../../types/foodTypes'
import type { BookingType } from '../../types/bookingType'

const Cart: React.FC = () => {
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
    <div className="max-w-[1000px] mx-auto mt-10 pt-[100px] p-5 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
      {myBookings.length === 0 && myFoodOrders.length === 0 && (
        <p className="text-center text-gray-500">Bạn chưa có đơn hàng nào.</p>
      )}

      {/* Booking */}
      {myBookings.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Thông tin đặt phòng</h2>

          {myBookings.map((booking: BookingType) => (
            <div
              key={booking._id}
              className="flex gap-5 p-4 mb-5 border rounded-lg bg-[#fafafa] hover:shadow-md transition animate-[fadeIn_0.5s_ease-out] max-md:flex-col"
            >
              <img
                src={`${url}/upload/rooms/${booking.roomId.image}`}
                className="w-[120px] h-[90px] object-cover rounded-lg shrink-0 max-md:w-full"
              />

              <div className="flex justify-between w-full gap-5 max-md:flex-col">
                <div className="flex flex-wrap gap-6">
                  <Info label="Loại phòng" value={booking.roomId.roomType} />
                  <Info label="Số người" value={booking.guests} />
                  <Info label="Check-in" value={new Date(booking.checkInDate).toLocaleDateString('vi-VN')} />
                  <Info label="Check-out" value={new Date(booking.checkOutDate).toLocaleDateString('vi-VN')} />
                  <Info label="Giá" value={`${getRoomPrice(booking).toLocaleString()}đ`} />
                </div>

                <button
                  onClick={() => removeFromBooking(booking._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg transition self-start"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Food */}
      {myFoodOrders.length > 0 && (
        <>
          <hr className="my-8" />
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Đồ ăn đã đặt</h2>

          {myFoodOrders.map((item: FoodOrder) => (
            <div
              key={item._id}
              className="flex gap-5 p-4 mb-5 border rounded-lg bg-[#fafafa] hover:shadow-md transition animate-[fadeIn_0.5s_ease-out] max-md:flex-col"
            >
              <img
                src={`${url}/upload/foods/${item.image}`}
                className="w-[120px] h-[90px] object-cover rounded-lg shrink-0 max-md:w-full"
              />

              <div className="flex justify-between w-full gap-5 max-md:flex-col">
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Món:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Số lượng:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Giao:</strong> {item.deliveryTime} |{' '}
                    {new Date(item.deliveryDate).toLocaleDateString('vi-VN')}
                  </p>
                  <p>
                    <strong>Ghi chú:</strong> {item.note}
                  </p>
                  <p>
                    <strong>Giá:</strong> {getFoodPrice(item).toLocaleString()}đ
                  </p>
                </div>

                <button
                  onClick={() => removeFoodFromCart(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg transition self-start"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {(myBookings.length > 0 || myFoodOrders.length > 0) && (
        <>
          <hr className="my-8" />
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Tổng tiền:</h3>
              <p className="text-xl font-bold text-green-600">
                {(getRoomTotalPrice() + getFoodTotalPrice()).toLocaleString()}đ
              </p>
            </div>

            <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
              Thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  )
}

const Info = ({ label, value }: { label: string; value: any }) => (
  <div className="min-w-[120px]">
    <p className="font-semibold text-gray-600">{label}</p>
    <p>{value}</p>
  </div>
)

export default Cart
