import HotelCard from '../hotel/HotelCard'
import type { RoomType } from '../../../types/room.type'

interface RoomListProps {
  rooms: RoomType[]
}

const RoomList = ({ rooms }: RoomListProps) => {
  if (rooms.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-500">Hiện tại chưa có phòng phù hợp.</p>
      </div>
    )
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6
        px-6
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
    >
      {rooms.map(room => (
        <HotelCard key={room._id} hotel={room} />
      ))}
    </div>
  )
}

export default RoomList
