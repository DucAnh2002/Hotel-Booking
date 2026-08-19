export type RoomRatingFilter = 'all' | '4' | '3' | '2'
export type RoomSortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc'
export interface RoomFilterState {
  roomType: string
  rating: RoomRatingFilter
  minPrice: number
  maxPrice: number
}
