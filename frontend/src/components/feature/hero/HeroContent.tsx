import { ArrowRight, MapPin, Utensils, Waves } from 'lucide-react'
import { HERO_CONTENT } from './Hero.constants'

const HeroContent = () => {
  return (
    <div className="absolute inset-0 z-20 flex items-center">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="rounded-full bg-white/10 px-5 py-2 text-sm text-white backdrop-blur">
            {HERO_CONTENT.badge}
          </span>

          <h1 className="mt-6 whitespace-pre-line text-5xl font-bold leading-tight text-white lg:text-7xl">
            {HERO_CONTENT.title}
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-200">{HERO_CONTENT.description}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
              <MapPin size={18} />
              <span className="text-white">{HERO_CONTENT.features[0]}</span>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
              <Waves size={18} />
              <span className="text-white">{HERO_CONTENT.features[1]}</span>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
              <Utensils size={18} />
              <span className="text-white">{HERO_CONTENT.features[2]}</span>
            </div>
          </div>

          <button
            className="
                        mt-10
                        flex
                        items-center
                        gap-3
                        rounded-full
                        bg-amber-500
                        px-7
                        py-4
                        font-semibold
                        text-white
                        transition
                        hover:bg-amber-600"
          >
            Khám phá phòng
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroContent
