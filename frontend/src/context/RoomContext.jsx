import { useEffect, useState } from 'react'
import { RoomContext } from './index.js'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import { toast } from 'react-toastify'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { confirmAlert } from 'react-confirm-alert'
const RoomContextProvider = ({ children }) => {
  const [roomList, setRoomList] = useState([])
  const [bookingCart, setBookingCart] = useState({})
  const [myBookings, setMyBookings] = useState([])
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

  // ✅ Lấy danh sách phòng từ backend
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(`${url}/api/room/list-room`)
        setRoomList(res.data.data) // assuming { success: true, data: [...] }
      } catch (err) {
        console.error('Lỗi khi lấy danh sách phòng:', err)
      }
    }

    fetchRooms()
  }, [])

  // Gọi hàm lấy danh sách đặt phòng khi người dùng đã đăng nhập
  useEffect(() => {
    if (isAuthenticated) {
      getMyBookings().then(bookings => {
        if (bookings.length > 0) {
          console.log('Danh sách đặt phòng:', bookings)
        } else {
          console.log('Bạn chưa đặt phòng nào.')
        }
      })
    }
  }, [isAuthenticated])

  // ✅ Thêm phòng vào giỏ đặt phòng (1 user đặt được nhiều phòng)
  const addToBookingCart = async roomId => {
    setBookingCart(prev => ({
      ...prev,
      [roomId]: (prev[roomId] || 0) + 1
    }))
  }

  // ✅ Gửi yêu cầu đặt phòng
  const bookRoom = async ({ roomId, checkInDate, checkOutDate, guests }) => {
    const token = await getAccessTokenSilently()
    try {
      await axios.post(
        `${url}/api/booking/book-room`,
        { roomId, checkInDate, checkOutDate, guests },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      // await getMyBookings() // cập nhật danh sách đặt phòng sau khi đặt thành công
      toast.success('Đặt phòng thành công!')
    } catch (err) {
      console.error('Lỗi khi gửi yêu cầu đặt phòng:', err)
      toast.error('Không thể đặt phòng. Vui lòng thử lại!')
      throw err // ném lỗi để component cha có thể xử lý
    }
  }

  // Lấy danh sách phòng đã đặt của người dùng
  const getMyBookings = async () => {
    try {
      const token = await getAccessTokenSilently()
      console.log('token', token)
      const res = await axios.get(`${url}/api/booking/my-bookings`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setMyBookings(res.data.data)
      return res.data // ✅ trả về danh sách đặt phòng
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đặt phòng:', error.message)
      toast.error('Không thể lấy danh sách phòng đã đặt.')
      return [] // trả về mảng rỗng nếu có lỗi
    }
  }

  // ✅ Xóa phòng khỏi booking
  const removeFromBooking = async bookingId => {
    confirmAlert({
      message: 'Bạn có chắc muốn hủy đặt phòng này?',
      buttons: [
        {
          label: 'Có!',
          onClick: async () => {
            try {
              const token = await getAccessTokenSilently()
              const res = await axios.delete(`${url}/api/booking/remove/${bookingId}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
              const data = await res.data
              if (data.success) {
                toast.success('Đã hủy đặt phòng!')
                getMyBookings() // cập nhật lại danh sách sau khi xóa.
              } else {
                toast.error(data.message || 'Không thể hủy đặt phòng, vui lòng thử lại sau!')
              }
            } catch (error) {
              console.error(' Lỗi hủy đặt phòng!', error)
              toast.error('Lỗi kết nối khi hủy đặt phòng!')
            }
          }
        },
        {
          label: 'Không!',
          onClick: () => {}
        }
      ]
    })
  }

  // Tính tiền phòng
  // ✅ Tính tiền cho 1 đơn đặt phòng
  const getRoomPrice = booking => {
    const checkIn = new Date(booking.checkInDate)
    const checkOut = new Date(booking.checkOutDate)
    const days = Math.max((checkOut - checkIn) / (1000 * 60 * 60 * 24), 1)
    return booking.roomId.price * days
  }
  // Tính tổng tiền phòng
  const getRoomTotalPrice = () => {
    return myBookings.reduce((total, booking) => {
      const checkIn = new Date(booking.checkInDate)
      const checkOut = new Date(booking.checkOutDate)
      const days = Math.max((checkOut - checkIn) / (1000 * 60 * 60 * 24), 1)
      return total + booking.roomId.price * days
    }, 0)
  }

  return (
    <RoomContext.Provider
      value={{
        roomList,
        bookingCart,
        myBookings,
        addToBookingCart,
        bookRoom,
        removeFromBooking,
        getRoomTotalPrice,
        getMyBookings,
        getRoomPrice
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}

export default RoomContextProvider
