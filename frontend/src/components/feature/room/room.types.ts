export type RoomRatingFilter = 'all' | '4' | '3' | '2'

export interface RoomFilterState {
  roomType: string
  rating: RoomRatingFilter
  minPrice: number
  maxPrice: number
}
