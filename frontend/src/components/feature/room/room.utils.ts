import type { RoomType } from '../../../types/room.type'
import type { RoomFilterState } from './room.types'
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE } from './room.constants'

export const getDefaultRoomFilter = (): RoomFilterState => ({
  roomType: '',
  rating: 'all',
  minPrice: DEFAULT_MIN_PRICE,
  maxPrice: DEFAULT_MAX_PRICE
})

export const filterRooms = (rooms: RoomType[], filters: RoomFilterState): RoomType[] => {
  return rooms.filter(room => {
    const matchesRoomType = !filters.roomType || room.roomType === filters.roomType

    const matchesRating = filters.rating === 'all' || room.rating >= Number(filters.rating)

    const matchesMinPrice = room.price >= filters.minPrice

    const matchesMaxPrice = room.price <= filters.maxPrice

    return matchesRoomType && matchesRating && matchesMinPrice && matchesMaxPrice
  })
}
