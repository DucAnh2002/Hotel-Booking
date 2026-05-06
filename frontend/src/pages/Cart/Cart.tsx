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
  const isEmpty = myBookings.length === 0 && myFoodOrders.length === 0
  return (
    <div className="max-w-5xl mx-auto px-4 pt-24 pb-10">
      {isEmpty && (
        <div className="text-center py-20">
          <p className="text-lg text-gray-500">Bạn chưa có đơn hàng nào.</p>
        </div>
      )}

      {/* Booking */}
      {myBookings.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-6 text text-center">Thông tin đặt phòng</h2>
          <div className="space-y-4">
            {myBookings.map((booking: BookingType) => (
              <div key={booking._id} className="bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row gap-4">
                <img
                  src={`${url}/upload/rooms/${booking.roomId.image}`}
                  className="w-full sm:w-32 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{booking.roomId.roomType}</h3>
                  <p className="text-gray-500 text-sm">
                    {new Date(booking.checkInDate).toLocaleDateString('vi-VN')} -{' '}
                    {new Date(booking.checkOutDate).toLocaleDateString('vi-VN')}
                  </p>
                  <p className="text-sm text-gray-500">{booking.guests} khách</p>
                  <p className="font-semibold text-green-600 mt-1"> {getRoomPrice(booking).toLocaleString()}đ</p>

                  <button
                    onClick={() => removeFromBooking(booking._id)}
                    className="self-start sm:self-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition active:scale-95"
                  >
                    Cancle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Food */}
      {myFoodOrders.length > 0 && (
        <>
          <hr className="my-8" />
          <h2 className="text-xl font-semibold mt-10 mb-6 text-center">Đồ ăn </h2>
          <div className="space-y-4">
            {myFoodOrders.map((item: FoodOrder) => (
              <div key={item._id} className="bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row gap-4">
                <img
                  src={`${url}/upload/foods/${item.image}`}
                  className="w-full sm:w-32 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.quantity} phần</p>
                  <p className="text-sm text-gray-500">
                    {item.deliveryTime} | {new Date(item.deliveryDate).toLocaleDateString('vi-VN')}
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-1">{item.note}</p>
                  <p className="font-semibold text-green-600 mt-1">{getFoodPrice(item).toLocaleString()}đ</p>

                  <button
                    onClick={() => removeFoodFromCart(item._id)}
                    className="self-start sm:self-center px-4 bg-red-500 text-white rounded-lg hover:bg-red-700 transition active:scale-95"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            ))}
          </div>
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

            {/* <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
              Thanh toán
            </button> */}
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
