import { useContext, useEffect, useMemo, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { RoomContext } from '../../context'

import FloatingCart from '../../components/feature/cart/FloatingCart'

import { RoomFilter, RoomHeader, RoomList } from '../../components/feature/room'

import type { RoomFilterState } from '../../components/feature/room/room.types'

import { filterRooms, getDefaultRoomFilter } from '../../components/feature/room/room.utils'

import { getRoomSearchParams } from '../../components/feature/search/booking.utils'

const Room = () => {
  const { roomList } = useContext(RoomContext)

  const [searchParams, setSearchParams] = useSearchParams()

  const searchData = useMemo(() => getRoomSearchParams(searchParams), [searchParams])

  const [filters, setFilters] = useState<RoomFilterState>(() => ({
    ...getDefaultRoomFilter(),
    roomType: searchData.roomType
  }))

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      roomType: searchData.roomType
    }))
  }, [searchData.roomType])

  const handleFilterChange = <K extends keyof RoomFilterState>(field: K, value: RoomFilterState[K]) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const resetFilters = () => {
    setFilters(getDefaultRoomFilter())
    setSearchParams({})
  }

  const roomTypes = useMemo(() => {
    const uniqueRoomTypes = new Set(roomList.map(room => room.roomType))

    return Array.from(uniqueRoomTypes)
  }, [roomList])

  const filteredRooms = useMemo(() => {
    return filterRooms(roomList, filters)
  }, [roomList, filters])

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <RoomHeader />

      <RoomFilter filters={filters} roomTypes={roomTypes} onChange={handleFilterChange} onReset={resetFilters} />

      <main className="mx-auto w-full max-w-7xl">
        <RoomList rooms={filteredRooms} />
      </main>

      <FloatingCart />
    </div>
  )
}

export default Room
