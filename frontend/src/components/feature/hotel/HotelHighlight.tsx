import { Wifi, Coffee, Waves, Plane } from 'lucide-react'

const highlights = [
  {
    icon: Wifi,
    title: 'WiFi miễn phí',
    description: 'Kết nối internet tốc độ cao trong toàn bộ khuôn viên khách sạn.'
  },
  {
    icon: Coffee,
    title: 'Bữa sáng miễn phí',
    description: 'Thưởng thức bữa sáng ngon miệng trong không gian hiện đại.'
  },
  {
    icon: Waves,
    title: 'Hồ bơi vô cực',
    description: 'Tận hưởng không gian bơi lội rộng rãi và hiện đại.'
  },
  {
    icon: Plane,
    title: 'Đưa đón sân bay',
    description: 'Dịch vụ đưa đón tận nơi tại sân bay với đội ngũ nhân viên chuyên nghiệp.'
  }
]

const HotelHighlights = () => {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Highlights Card */}
        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-gray-200
            bg-[#eaeef1]
            shadow-sm
          "
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {highlights.map(({ icon: Icon, title, description }, index) => (
              <div
                key={title}
                className={`
                  flex
                  flex-col
                  items-center
                  px-6
                  py-7
                  text-center
                  transition
                  duration-300
                  hover:bg-white/60
                  
                  ${index < highlights.length - 1 ? 'border-b border-gray-300 lg:border-b-0 lg:border-r' : ''}
                `}
              >
                {/* Icon */}
                <div
                  className="
                    mb-4
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#C9A227]/40
                    bg-white
                  "
                >
                  <Icon size={21} strokeWidth={1.5} className="text-[#C9A227]" />
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-[#0B1F33] sm:text-base">{title}</h3>

                {/* Description */}
                <p className="mt-2 max-w-xs text-xs leading-5 text-gray-500 sm:text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HotelHighlights
