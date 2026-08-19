import type { RoomType } from '../../../types/room.type'
import type { RoomFilterState, RoomSortOption } from './room.types'
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

export const sortRooms = (rooms: RoomType[], sortOption: RoomSortOption): RoomType[] => {
  if (sortOption === 'default') {
    return rooms
  }

  return [...rooms].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'rating-desc':
        return b.rating - a.rating
      default:
        return 0
    }
  })
}

export const isValidPriceRange = (minPrice: number, maxPrice: number): boolean => {
  return (
    Number.isFinite(minPrice) && Number.isFinite(maxPrice) && minPrice >= 0 && maxPrice >= 0 && minPrice <= maxPrice
  )
}

export const buildRoomFilterSearchParams = (
  filters: RoomFilterState,
  currentParams: URLSearchParams
): URLSearchParams => {
  const params = new URLSearchParams(currentParams)

  if (filters.roomType) {
    params.set('roomType', filters.roomType)
  } else {
    params.delete('roomType')
  }

  if (filters.rating !== 'all') {
    params.set('rating', filters.rating)
  } else {
    params.delete('rating')
  }

  if (filters.minPrice !== DEFAULT_MIN_PRICE) {
    params.set('minPrice', String(filters.minPrice))
  } else {
    params.delete('minPrice')
  }

  if (filters.maxPrice !== DEFAULT_MAX_PRICE) {
    params.set('maxPrice', String(filters.maxPrice))
  } else {
    params.delete('maxPrice')
  }

  return params
}

export const getRoomFilterFromSearchParams = (searchParams: URLSearchParams): RoomFilterState => {
  const defaultFilter = getDefaultRoomFilter()

  const roomType = searchParams.get('roomType') ?? defaultFilter.roomType

  const ratingParam = searchParams.get('rating')

  const rating: RoomFilterState['rating'] =
    ratingParam === '4' || ratingParam === '3' || ratingParam === '2' ? ratingParam : defaultFilter.rating

  const minPriceValue = searchParams.get('minPrice')
  const maxPriceValue = searchParams.get('maxPrice')

  const minPrice = minPriceValue !== null ? Number(minPriceValue) : defaultFilter.minPrice

  const maxPrice = maxPriceValue !== null ? Number(maxPriceValue) : defaultFilter.maxPrice

  return {
    roomType,
    rating,

    minPrice: Number.isFinite(minPrice) && minPrice >= 0 ? minPrice : defaultFilter.minPrice,

    maxPrice: Number.isFinite(maxPrice) && maxPrice >= 0 ? maxPrice : defaultFilter.maxPrice
  }
}
