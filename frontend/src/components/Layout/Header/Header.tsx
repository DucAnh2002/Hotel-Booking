import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'

const images: string[] = ['/banner/banner1.jpg', '/banner/banner2.jpg', '/banner/banner4.jpg']

const Header: React.FC = () => {
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const handlePrev = () => setIndex(prev => (prev - 1 + images.length) % images.length)
  const handleNext = () => setIndex(prev => (prev + 1) % images.length)

  return (
    <div className="relative h-[60vh] sm:h-[800vh]overflow-hidden">
      <Navbar />

      <div className="relative w-full h-full overflow-hidden">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`banner-${i}`}
            className={`
              absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out
              ${i === index ? 'opacity-100 z-10' : 'opacity-0'}
            `}
          />
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10 z-10" />
        {/* Content center */}
        <div className="absolute z-20 inset-0 flex flex-col items-center justify-center text-center px-4" />
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-3"> Nha Trang Hotel</h1>
        <p className="text-sm sm:text-lg text-gray-200 mb-4 max-w-xl">
          Trải nghiệm đặt phòng nhanh chóng - tiện lợi - an toàn
        </p>
        "
        <button
          onClick={handlePrev}
          className="
            absolute z-30 left-3 sm:left-5 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 sm:p-4 rounded-full hover:bg-black/80 transition
          "
        >
          ‹
        </button>
        <button
          onClick={handleNext}
          className="
            absolute z-30 right-3 sm:right-5 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 sm:p-4 rounded-full hover:bg-black/80 transition
          "
        >
          ›
        </button>
      </div>
    </div>
  )
}

export default Header
