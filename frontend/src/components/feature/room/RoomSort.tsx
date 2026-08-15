import { ArrowDownUp } from 'lucide-react'

import { ROOM_SORT_OPTIONS } from './room.constants'
import type { RoomSortOption } from './room.types'

interface RoomSortProps {
  value: RoomSortOption
  onChange: (value: RoomSortOption) => void
}

const RoomSort = ({ value, onChange }: RoomSortProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <ArrowDownUp size={16} />

        <span className="hidden sm:inline">Giá:</span>
      </div>
      <select
        value={value}
        onChange={event => onChange(event.target.value as RoomSortOption)}
        className="
            rounded-xl
            border
            border-gray-200
            bg-white
            px-4
            py-2.5
            text-sm
            text-gray-700
            outline-none
            transition
            focus:border-amber-500"
        aria-label="sắp xếp phòng"
      >
        {ROOM_SORT_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default RoomSort
