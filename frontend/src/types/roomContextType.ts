import type { RoomType } from './roomType'
import type { BookingType } from './bookingType'
import type { ReactNode } from 'react'

export interface RoomContextType {
  roomList: RoomType[]
  bookingCart: Record<string, number>
  myBookings: BookingType[]

  addToBookingCart: (roomId: string) => Promise<void> | void

  bookRoom: (data: { roomId: string; checkInDate: string; checkOutDate: string; guests: number }) => Promise<void>

  removeFromBooking: (bookingId: string) => Promise<void> | void

  getRoomTotalPrice: () => number

  getMyBookings: () => Promise<BookingType[] | []>

  getRoomPrice: (booking: BookingType) => number
}

export interface RoomProviderProps {
  children: ReactNode
}
