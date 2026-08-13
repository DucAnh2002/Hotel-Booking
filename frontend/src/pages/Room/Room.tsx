import { useContext, useState, useMemo } from 'react'
import { RoomContext } from '../../context'
import FloatingCart from '../../components/feature/cart/FloatingCart'
import { RoomHeader, RoomList, RoomFilter } from '../../components/feature/room'

import type { RoomFilterState } from '../../components/feature/room/room.types'
import { filterRooms, getDefaultRoomFilter } from '../../components/feature/room/room.utils'

const Room = () => {
  const { roomList } = useContext(RoomContext)
  const [filters, setFilters] = useState<RoomFilterState>(getDefaultRoomFilter())

  const handleFilterChange = <K extends keyof RoomFilterState>(field: K, value: RoomFilterState[K]) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const resetFilters = () => {
    setFilters(getDefaultRoomFilter())
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
