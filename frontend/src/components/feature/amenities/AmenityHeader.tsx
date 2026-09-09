import { Search } from 'lucide-react'
const AmenityHeader = () => {
  return (
    <header
      className="relative h-[480px] w-full overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url('/banner/banner5.jpg')`
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 mx-10 flex h-full max-w-7xl items-center px-2">
        <div className="text-left text-white">
          <h1 className="text-4xl font-serif font-bold md:text-3xl ">
            Khám phá dịch vụ & tiện ích tại Nha Trang Hotel
          </h1>
          {/* <h1 className="text-4xl font-bold md:text-3xl">Lựa chọn không gian lưu trú lý tưởng dành riêng cho bạn</h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/90 md:text-base">
            Trải nghiệm sự thoải mái và đẳng cấp qua các hạng phòng đa dạng – từ phòng tiêu chuẩn hiện đại đến suite
            sang trọng với tầm nhìn tuyệt đẹp. Mỗi hạng phòng được thiết kế tinh tế, trang bị tiện nghi cao cấp, mang
            đến kỳ nghỉ hoàn hảo cho mọi nhu cầu của bạn.
          </p> */}

          <div className="absolute bottom-8 left-1/2 z-20 w-[90%] max-w-2xl -translate-x-1/2 ">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default AmenityHeader
