import type { AxiosInstance } from 'axios'

export interface BookRoomInput {
  roomId: string
  checkInDate: string
  checkOutDate: string
  guests: number
  paymentMethod?: 'bank_transfer' | 'cash'
}

export const bookingApi = {
  getRooms: async (client: AxiosInstance) => {
    const res = await client.get('/api/v1/rooms/list-room')
    return res.data.data
  },

  getMyBookings: async (client: AxiosInstance) => {
    const res = await client.get('/api/v1/bookings/my-bookings')
    return res.data.data
  },

  bookRoom: async (client: AxiosInstance, data: BookRoomInput) => {
    const res = await client.post('/api/v1/bookings/book-room', data)
    return res.data
  },
  getRoomById: async (client: AxiosInstance, roomId: string) => {
    const res = await client.get(`/api/v1/rooms/${roomId}`)
    return res.data.data
  },

  paymentSuccess: async (client: AxiosInstance, data: any) => {
    const res = await client.post('/api/v1/payment/...', data)
    return res.data
  },

  removeBooking: async (client: AxiosInstance, bookingId: string) => {
    const res = await client.delete(`/api/v1/bookings/remove/${bookingId}`)
    return res.data
  }
}
