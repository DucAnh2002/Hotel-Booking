export const DEFAULT_MIN_PRICE = 0

export const DEFAULT_MAX_PRICE = 10000000

export const ROOMS_PER_PAGE = 8

export const ROOM_RATING_OPTIONS = [
  {
    value: 'all',
    label: 'Tất cả đánh giá'
  },
  {
    value: '4',
    label: 'Từ 4 sao'
  },
  {
    value: '3',
    label: 'Từ 3 sao'
  },
  {
    value: '2',
    label: 'Từ 2 sao'
  }
] as const

export const ROOM_SORT_OPTIONS = [
  {
    value: 'default',
    label: 'Mặc định'
  },
  {
    value: 'price-asc',
    label: 'thấp -> cao'
  },
  {
    value: 'price-desc',
    label: 'cao -> thấp'
  },
  {
    value: 'rating-desc',
    label: 'đánh giá cao nhất'
  }
] as const
