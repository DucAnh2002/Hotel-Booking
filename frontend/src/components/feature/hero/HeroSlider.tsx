import { useEffect, useState } from 'react'
import { HERO_IMAGES, HERO_SLIDE_INTERVAL } from './Hero.constants'

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_IMAGES.length)
    }, HERO_SLIDE_INTERVAL)

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {HERO_IMAGES.map((image, index) => (
        <img
          key={image}
          src={image}
          alt={`Hero ${index}`}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000
                    ${currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />

      {/* Indicator */}
      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all
                        ${currentSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
          />
        ))}
      </div>
    </>
  )
}

export default HeroSlider
