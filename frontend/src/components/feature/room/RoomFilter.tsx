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
    <section className="mx-auto mb-8 max-w-7xl px-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-amber-500" />

            <h2 className="text-lg font-semibold text-gray-800">Lọc phòng</h2>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-gray-500
              transition
              hover:text-amber-600
            "
          >
            <RotateCcw size={16} />
            Xóa bộ lọc
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Room Type */}
          <div className="space-y-2">
            <label htmlFor="roomType" className="text-sm font-medium text-gray-700">
              Loại phòng
            </label>

            <select
              id="roomType"
              value={filters.roomType}
              onChange={event => onChange('roomType', event.target.value)}
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                bg-white
                px-4
                py-3
                text-sm
                text-gray-700
                outline-none
                transition
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
            <label htmlFor="rating" className="text-sm font-medium text-gray-700">
              Đánh giá
            </label>

            <select
              id="rating"
              value={filters.rating}
              onChange={event => onChange('rating', event.target.value as RoomFilterState['rating'])}
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                bg-white
                px-4
                py-3
                text-sm
                text-gray-700
                outline-none
                transition
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
            <label htmlFor="minPrice" className="text-sm font-medium text-gray-700">
              Giá từ
            </label>

            <input
              id="minPrice"
              type="number"
              min={0}
              value={filters.minPrice}
              onChange={event => onChange('minPrice', Number(event.target.value))}
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                px-4
                py-3
                text-sm
                text-gray-700
                outline-none
                transition
                focus:border-amber-500
              "
            />
          </div>
          {priceError && <p className="mt-4 text-sm font-medium text-red-500">{priceError}</p>}
          {/* Maximum Price */}
          <div className="space-y-2">
            <label htmlFor="maxPrice" className="text-sm font-medium text-gray-700">
              Giá đến
            </label>

            <input
              id="maxPrice"
              type="number"
              min={0}
              value={filters.maxPrice}
              onChange={event => onChange('maxPrice', Number(event.target.value))}
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                px-4
                py-3
                text-sm
                text-gray-700
                outline-none
                transition
                focus:border-amber-500
              "
            />
          </div>
          {priceError && <p className="mt-4 text-sm font-medium text-red-500">{priceError}</p>}
        </div>
      </div>
    </section>
  )
}

export default RoomFilter
