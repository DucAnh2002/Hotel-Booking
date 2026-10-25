import { useEffect, useState, useCallback } from 'react'
import { RoomContext } from './index.ts'
import { useAuth0 } from '@auth0/auth0-react'
import { useAuthApi } from '../hooks/useAuth.ts'
import { bookingApi } from '../api/booking.api.ts'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import type { RoomType } from '../types/room.type.ts'
import type { BookingType } from '../types/booking.type.ts'
import type { RoomProviderProps } from '../types/room-context.type.ts'

const RoomContextProvider = ({ children }: RoomProviderProps) => {
  const [roomList, setRoomList] = useState<RoomType[]>([])
  const [bookingCart, setBookingCart] = useState<Record<string, number>>({})
  const [myBookings, setMyBookings] = useState<BookingType[]>([])

  const { isAuthenticated } = useAuth0()
  const { apiClient } = useAuthApi()

  // Lấy danh sách phòng
  useEffect(() => {
    bookingApi
      .getRooms(apiClient)
      .then(data => setRoomList(data || []))
      .catch(err => console.error('Lỗi khi lấy danh sách phòng: ', err))
  }, [apiClient])

  // Lấy danh sách booking của user sau khi login
  const getMyBooking = useCallback(async (): Promise<BookingType[]> => {
    try {
      const bookings = await bookingApi.getMyBookings(apiClient)
      setMyBookings(bookings || [])
      return bookings || []
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đặt phòng', error)
      toast.error('Không thể lấy danh sách đặt phòng')
      return []
    }
  }, [apiClient])

  useEffect(() => {
    if (isAuthenticated) {
      getMyBooking()
    }
  }, [isAuthenticated, getMyBooking])

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
  const bookRoom = async (data: { roomId: string; checkInDate: string; checkOutDate: string; guests: number }) => {
    try {
      await bookingApi.bookRoom(apiClient, data)
      toast.success('Đặt phòng thành công!')
    } catch (err) {
      console.error('Lỗi khi gửi yêu cầu đặt phòng:', err)
      toast.error('Không thể đặt phòng. Vui lòng thử lại!')
      throw err
    }
  }

  // Lưu thanh toán
  const savePaymentBooking = async (data: any) => {
    try {
      const res = await bookingApi.paymentSuccess(apiClient, data)
      if (res.success) {
        toast.success('Thanh toán thành công!')
        await getMyBooking()
        setBookingCart({})
      }
    } catch (error) {
      console.error('Lỗi lưu payment booking: ', error)
      toast.error('Thanh toán thất bại!')
    }
  }

  // Hủy đặt phòng
  const removeFromBooking = async (bookingId: string) => {
    confirmAlert({
      message: 'Bạn có chắc muốn hủy đặt phòng này?',
      buttons: [
        {
          label: 'Có!',
          onClick: async () => {
            try {
              const res = await bookingApi.removeBooking(apiClient, bookingId)
              if (res.success) {
                toast.success('Đã hủy đặt phòng!')
                await getMyBooking()
              } else {
                toast.error(res.message || 'Không thể hủy đặt phòng!')
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

        getMyBooking,

        getRoomPrice,

        clearBookingCart
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}

export default RoomContextProvider
