import { DEFAULT_GUESTS } from './booking.constants'
import type { BookingSearchState } from './booking.types'

export const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0]
}

export const addDays = (date: string, days: number) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)

  return formatDate(result)
}

export const isAfterDate = (start: string, end: string) => {
  return new Date(end) > new Date(start)
}

export const getDefaultSearchState = (): BookingSearchState => {
  const today = new Date()

  const tomorrow = new Date(today)

  tomorrow.setDate(today.getDate() + 1)

  return {
    roomId: '',
    checkInDate: formatDate(today),
    checkOutDate: formatDate(tomorrow),
    guests: DEFAULT_GUESTS
  }
}

export interface ValidateSearchResult {
  valid: boolean
  message?: string
}

export const validateSearch = (searchData: BookingSearchState): ValidateSearchResult => {
  if (!searchData.roomId) {
    return {
      valid: false,
      message: 'Vui lòng chọn loại phòng!'
    }
  }

  if (!searchData.checkInDate) {
    return {
      valid: false,
      message: 'Vui lòng chọn ngày nhận phòng!'
    }
  }

  if (!searchData.checkOutDate) {
    return {
      valid: false,
      message: 'Vui lòng chọn ngày trả phòng!'
    }
  }

  if (new Date(searchData.checkOutDate) <= new Date(searchData.checkInDate)) {
    return {
      valid: false,
      message: 'Ngày trả phòng phải sau ngày nhận phòng!'
    }
  }
  return {
    valid: true
  }
}

export const buildSearchQuery = (searchData: BookingSearchState) => {
  const params = new URLSearchParams()
  params.set('roomId', searchData.roomId)
  params.set('checkInDate', searchData.checkInDate)
  params.set('checkOutDate', searchData.checkOutDate)
  params.set('guests', searchData.guests.toString())
  return params.toString()
}
