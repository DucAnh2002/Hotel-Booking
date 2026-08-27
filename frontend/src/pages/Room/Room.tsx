import { useContext, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { RoomContext } from '../../context'

import FloatingCart from '../../components/feature/cart/FloatingCart'

import { RoomFilter, RoomHeader, RoomList, RoomPagination, RoomSort } from '../../components/feature/room'

import type { RoomFilterState, RoomSortOption } from '../../components/feature/room/room.types'

import {
  filterRooms,
  getDefaultRoomFilter,
  getRoomFilterFromSearchParams,
  buildRoomFilterSearchParams,
  isValidPriceRange,
  sortRooms
} from '../../components/feature/room/room.utils'

import { ROOMS_PER_PAGE } from '../../components/feature/room/room.constants'

const Room = () => {
  const { roomList } = useContext(RoomContext)

  const [searchParams, setSearchParams] = useSearchParams()

  const [filters, setFilters] = useState<RoomFilterState>(() => getRoomFilterFromSearchParams(searchParams))

  const [sortBy, setSortBy] = useState<RoomSortOption>('default')

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const nextParams = buildRoomFilterSearchParams(filters, searchParams)

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, {
        replace: true
      })
    }
  }, [filters, searchParams, setSearchParams])

  const handleFilterChange = <K extends keyof RoomFilterState>(field: K, value: RoomFilterState[K]) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const resetFilters = () => {
    setFilters(getDefaultRoomFilter())
    setSortBy('default')
    setCurrentPage(1)
    setSearchParams({})
  }

  const handleSortChange = (value: RoomSortOption) => {
    setSortBy(value)
    setCurrentPage(1)
  }

  const hasValidPriceRange = useMemo(() => {
    return isValidPriceRange(filters.minPrice, filters.maxPrice)
  }, [filters.minPrice, filters.maxPrice])

  const roomTypes = useMemo(() => {
    const uniqueRoomTypes = new Set(roomList.map(room => room.roomType))

    return Array.from(uniqueRoomTypes)
  }, [roomList])

  const filteredRooms = useMemo(() => {
    if (!hasValidPriceRange) {
      return []
    }

    return filterRooms(roomList, filters)
  }, [roomList, filters, hasValidPriceRange])

  const sortedRooms = useMemo(() => {
    return sortRooms(filteredRooms, sortBy)
  }, [filteredRooms, sortBy])

  const totalPages = Math.ceil(sortedRooms.length / ROOMS_PER_PAGE)

  const paginatedRooms = useMemo(() => {
    const startIndex = (currentPage - 1) * ROOMS_PER_PAGE
    const endIndex = startIndex + ROOMS_PER_PAGE

    return sortedRooms.slice(startIndex, endIndex)
  }, [sortedRooms, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [filters, sortBy])

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const priceError = hasValidPriceRange ? undefined : 'Khoảng giá không hợp lệ'
  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <RoomHeader />
      <div className="relative z-40 -mt-20 lg:-mt-20">
        <RoomFilter
          filters={filters}
          roomTypes={roomTypes}
          onChange={handleFilterChange}
          onReset={resetFilters}
          priceError={priceError}
        />
      </div>
      <main className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            Tìm thấy <span className="font-semibold text-gray-800">{sortedRooms.length}</span> phòng
          </p>

          <RoomSort value={sortBy} onChange={handleSortChange} />
        </div>

        <RoomList rooms={paginatedRooms} />

        <RoomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </main>

      <FloatingCart />
    </div>
  )
}

export default Room
