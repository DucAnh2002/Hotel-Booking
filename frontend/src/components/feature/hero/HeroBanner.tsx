import HeroContent from './HeroContent'
import HeroSlider from './HeroSlider'

const HeroBanner = () => {
  return (
    <section
      className="
            relative
            h-[560px]
            overflow-hidden
            lg:h-[580px]"
    >
      <HeroSlider />

      <HeroContent />
    </section>
  )
}

export default HeroBanner
