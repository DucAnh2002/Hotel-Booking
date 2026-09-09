import { useEffect, useState } from 'react'
import { MapPin, Utensils, Waves, Star } from 'lucide-react'

const HERO_IMAGES = ['/banner/banner1.jpg', '/banner/banner2.jpg', '/banner/banner4.jpg']

const HERO_SLIDE_INTERVAL = 5000

const HERO_CONTENT = {
  badge: 'Chào mừng đến với Nha Trang Hotel',

  title: 'Trải nghiệm kỳ nghỉ\n tuyệt vời bên bờ biển',

  description:
    'Khám phá những căn phòng sang trọng, không gian nghỉ dưỡng hiện đại cùng dịch vụ chuyên nghiệp, mang đến cho bạn một kỳ nghỉ đáng nhớ.',

  features: ['Vị trí trung tâm', 'Hồ bơi vô cực', 'Nhà hàng 5 sao']
}
const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_IMAGES.length)
    }, HERO_SLIDE_INTERVAL)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-[560px] w-full overflow-hidden lg:h-[580px]">
      {/* HERO IMAGES */}
      {HERO_IMAGES.map((image, index) => (
        <img
          key={image}
          src={image}
          alt={`Nha Trang Hotel - Hero ${index + 1}`}
          className={`
            absolute inset-0
            h-full w-full
            object-cover
            transition-all duration-1000
            ${currentSlide === index ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}
          `}
        />
      ))}

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />

      {/* CONTENT */}
      <div className="absolute inset-0 z-20">
        <div className="mx-auto flex h-full w-full max-w-7xl items-center px-6">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="hidden items-center gap-3 lg:flex">
              <Star size={16} color="#fe9a00" />

              <span className="rounded-full bg-white/10 px-5 py-1 text-sm text-white backdrop-blur">
                {HERO_CONTENT.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="whitespace-pre-line text-3xl font-bold leading-tight text-white lg:mt-6 lg:text-4xl">
              {HERO_CONTENT.title}
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg leading-8 text-gray-200">{HERO_CONTENT.description}</p>

            {/* Features */}
            <div className="mt-8 flex flex-wrap gap-4 py-4">
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
                <MapPin size={18} color="#fe9a00" />
                <span className="text-white">{HERO_CONTENT.features[0]}</span>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
                <Waves size={18} color="#fe9a00" />
                <span className="text-white">{HERO_CONTENT.features[1]}</span>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
                <Utensils size={18} color="#fe9a00" />
                <span className="text-white">{HERO_CONTENT.features[2]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INDICATOR */}
      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Chuyển đến ảnh ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
            className={`
              h-2 rounded-full transition-all
              ${currentSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/40'}
            `}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroBanner
