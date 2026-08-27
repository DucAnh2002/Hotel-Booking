import { Filter, RotateCcw } from 'lucide-react'
import type { RoomFilterState } from './room.types'
import { ROOM_RATING_OPTIONS } from './room.constants'

interface RoomFilterProps {
  filters: RoomFilterState
  roomTypes: string[]
  onChange: <K extends keyof RoomFilterState>(field: K, value: RoomFilterState[K]) => void
  onReset: () => void
  priceError?: string
}

const RoomFilter = ({ filters, roomTypes, onChange, onReset, priceError }: RoomFilterProps) => {
  return (
    <section className="relative z-40 mx-auto w-full max-w-5xl px-2 py-2 sm:px-4 lg:px-16 lg:py-0.5">
      <div
        className="rounded-xl
          border
          border-white/40
          bg-blue-50/40
          p-2
          shadow-2xl
          backdrop-blur-xl
          lg:p-2'
          "
      >
        <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {/* Room Type */}
          <div className="space-y-2 ">
            <label htmlFor="roomType" className="text-sm font-medium text-gray-700"></label>

            <select
              id="roomType"
              value={filters.roomType}
              onChange={event => onChange('roomType', event.target.value)}
              className="
                w-full
                
                border
                border-amber-600
                bg-white
                px-4
                py-3
                text-sm
                text-gray-700
                outline-none
                transition
                hover:bg-gray-300
                focus:border-amber-500
              "
            >
              <option value="">Tất cả loại phòng</option>

              {roomTypes.map(roomType => (
                <option key={roomType} value={roomType}>
                  {roomType}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <select
              id="rating"
              value={filters.rating}
              onChange={event => onChange('rating', event.target.value as RoomFilterState['rating'])}
              className="
                w-full
                
                border
                border-amber-600
                bg-white
                px-4
                py-3
                text-sm
                text-gray-700
                outline-none
                transition
                 hover:bg-gray-300
                focus:border-amber-500
              "
            >
              {ROOM_RATING_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Minimum Price */}
          <div className="space-y-2">
            <input
              id="minPrice"
              type="number"
              min={0}
              value={filters.minPrice}
              onChange={event => onChange('minPrice', Number(event.target.value))}
              className="
                w-full
                
                border
                border-amber-600
                 bg-white
                px-4
                py-3
                text-sm
                text-gray-700
                outline-none
                transition
                 hover:bg-gray-300
                focus:border-amber-500
              "
            />
          </div>
          {priceError && <p className="mt-4 text-sm font-medium text-red-500">{priceError}</p>}
          {/* Maximum Price */}
          <div className="space-y-2">
            <input
              id="maxPrice"
              type="number"
              min={0}
              value={filters.maxPrice}
              onChange={event => onChange('maxPrice', Number(event.target.value))}
              className="
                w-full
                
                border
                border-amber-600
                 bg-white
                px-4
                py-3
                text-sm
                text-gray-700
                outline-none
                transition
                 hover:bg-gray-300
                focus:border-amber-500
              "
            />

            <button
              type="button"
              onClick={onReset}
              className="
              flex
                items-center
                gap-1
                rounded-xl
                border
                border-gray-200
                px-4
                py-2
                text-0.2xl
                transition
                focus-within:border-amber-500
                hover:bg-gray-300
            "
            >
              <RotateCcw size={13} />
              Xóa bộ lọc
            </button>
          </div>
          {priceError && <p className="mt-4 text-sm font-medium text-red-500">{priceError}</p>}
        </div>
      </div>
    </section>
  )
}

export default RoomFilter
