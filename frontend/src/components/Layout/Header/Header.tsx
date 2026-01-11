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
    <div className="relative h-screen w-full overflow-hidden">
      <Navbar />

      <div className="relative w-full h-full overflow-hidden">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`banner-${i}`}
            className={`
              absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out
              ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}
            `}
          />
        ))}

        <button
          onClick={handlePrev}
          className="
            absolute top-1/2 -translate-y-1/2 left-5 
            bg-black/50 text-white text-3xl p-3 rounded 
            hover:bg-black/80 z-20
          "
        >
          ‹
        </button>

        <button
          onClick={handleNext}
          className="
            absolute top-1/2 -translate-y-1/2 right-5 
            bg-black/50 text-white text-3xl p-3 rounded 
            hover:bg-black/80 z-20
          "
        >
          ›
        </button>
      </div>
    </div>
  )
}

export default Header
