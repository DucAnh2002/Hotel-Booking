import type { RoomType } from '../types/room.type'

const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

export const getRoomImage = (room: RoomType): string => {
  return room.image.startsWith('http') ? room.image : `${backendURL}/upload/rooms/${room.image}`
}
