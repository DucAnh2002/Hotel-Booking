import { ROOMS_IMAGE } from './room.constants'

const RoomHeader = () => {
  return (
    <header
      className="relative h-[480px] w-full overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${ROOMS_IMAGE})`
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 mx-10 flex h-full max-w-7xl items-center px-2">
        <div className="text-left text-white">
          <h1 className="text-4xl font-bold md:text-3xl">Lựa chọn không gian lưu trú lý tưởng dành riêng cho bạn</h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/90 md:text-base">
            Trải nghiệm sự thoải mái và đẳng cấp qua các hạng phòng đa dạng – từ phòng tiêu chuẩn hiện đại đến suite
            sang trọng với tầm nhìn tuyệt đẹp. Mỗi hạng phòng được thiết kế tinh tế, trang bị tiện nghi cao cấp, mang
            đến kỳ nghỉ hoàn hảo cho mọi nhu cầu của bạn.
          </p>
        </div>
      </div>
    </header>
  )
}

export default RoomHeader
