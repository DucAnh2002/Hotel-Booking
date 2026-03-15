import { useEffect, useState } from 'react'
import { RoomContext } from './index.ts'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import type { RoomType } from '../types/roomType'
import type { BookingType } from '../types/bookingType'
import type { RoomProviderProps } from '../types/roomContextType'

const RoomContextProvider = ({ children }: RoomProviderProps) => {
  const [roomList, setRoomList] = useState<RoomType[]>([])
  const [bookingCart, setBookingCart] = useState<Record<string, number>>({})
  const [myBookings, setMyBookings] = useState<BookingType[]>([])

  const { getAccessTokenSilently, isAuthenticated } = useAuth0()

  const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

  // Lấy danh sách phòng
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(`${url}/api/room/list-room`)
        setRoomList(res.data.data)
      } catch (err) {
        console.error('Lỗi khi lấy danh sách phòng:', err)
      }
    }

    fetchRooms()
  }, [])

  // Lấy booking của user sau khi login
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

  // Thêm phòng vào giỏ
  const addToBookingCart = (roomId: string) => {
    if (bookingCart[roomId]) {
      toast.info('Phòng này đã được đặt!')
      return
    }

    setBookingCart(prev => ({
      ...prev,
      [roomId]: 1
    }))
  }

  // Đặt phòng
  const bookRoom = async ({
    roomId,
    checkInDate,
    checkOutDate,
    guests
  }: {
    roomId: string
    checkInDate: string
    checkOutDate: string
    guests: number
  }) => {
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

      toast.success('Đặt phòng thành công!')
    } catch (err) {
      console.error('Lỗi khi gửi yêu cầu đặt phòng:', err)
      toast.error('Không thể đặt phòng. Vui lòng thử lại!')
      throw err
    }
  }
  const savePaymentBooking = async ({
    roomId,
    checkInDate,
    checkOutDate,
    guests,
    totalPrice
  }: {
    roomId: string
    checkInDate: string
    checkOutDate: string
    guests: number
    totalPrice: number
  }) => {
    const token = await getAccessTokenSilently()

    try {
      const res = await axios.post(
        `${url}/api/booking/payment-success`,
        {
          roomId,
          checkInDate,
          checkOutDate,
          guests,
          totalPrice
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (res.data.success) {
        toast.success('Thanh toán thành công!')

        // cập nhật danh sách booking
        await getMyBookings()

        // clear cart
        setBookingCart({})
      }
    } catch (error) {
      console.error('Lỗi lưu payment booking:', error)

      toast.error('Thanh toán thất bại')
    }
  }
  // Lấy danh sách booking
  const getMyBookings = async (): Promise<BookingType[] | []> => {
    try {
      const token = await getAccessTokenSilently()
      const res = await axios.get(`${url}/api/booking/my-bookings`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const bookings = res.data.data || []

      setMyBookings(bookings)
      return bookings
    } catch (error: any) {
      console.error('Lỗi khi lấy danh sách đặt phòng:', error.message)
      toast.error('Không thể lấy danh sách đặt phòng.')
      return []
    }
  }

  // Xóa phòng đã đặt
  const removeFromBooking = async (bookingId: string) => {
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

              if (res.data.success) {
                toast.success('Đã hủy đặt phòng!')
                await getMyBookings()
              } else {
                toast.error(res.data.message || 'Không thể hủy đặt phòng!')
              }
            } catch (error) {
              console.error('Lỗi hủy đặt phòng!', error)
              toast.error('Lỗi kết nối khi hủy đặt phòng!')
            }
          }
        },
        { label: 'Không!', onClick: () => {} }
      ]
    })
  }

  // Tính tiền 1 booking
  const getRoomPrice = (booking: BookingType) => {
    const checkIn = new Date(booking.checkInDate)
    const checkOut = new Date(booking.checkOutDate)
    const days = Math.max((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24), 1)

    return booking.roomId.price * days
  }

  // Tổng tiền
  const getRoomTotalPrice = () => {
    return myBookings.reduce((total, booking) => {
      return total + getRoomPrice(booking)
    }, 0)
  }
  const clearBookingCart = () => {
    setBookingCart({})
  }
  return (
    <RoomContext.Provider
      value={{
        roomList,
        bookingCart,
        myBookings,

        addToBookingCart,

        bookRoom,

        savePaymentBooking,

        removeFromBooking,

        getRoomTotalPrice,

        getMyBookings,

        getRoomPrice,

        clearBookingCart
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}

export default RoomContextProvider
