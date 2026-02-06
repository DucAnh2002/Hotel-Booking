export interface BookingType {
  _id: string
  roomId: {
    _id?: string
    image: string
    roomType: string
    rating?: number
    address?: string
    price: number
  }
  guests: number
  checkInDate: string
  checkOutDate: string
}
