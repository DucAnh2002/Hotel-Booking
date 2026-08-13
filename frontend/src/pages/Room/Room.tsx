import { useContext } from 'react'
import { RoomContext } from '../../context'
import FloatingCart from '../../components/feature/cart/FloatingCart'
import { RoomHeader, RoomList } from '../../components/feature/room'

const Room = () => {
  const { roomList } = useContext(RoomContext)

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <RoomHeader />

      <main className="mx-auto w-full max-w-7xl">
        <RoomList rooms={roomList} />
      </main>

      <FloatingCart />
    </div>
  )
}

export default Room
