import { featuredAmenities } from '../../../data/Amenities/amenities.data'
import AmenityCard from './AmenityCard'

const FeaturedAmenities: React.FC = () => {
  return (
    <section className="bg-[#fcf3d2] py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-slate-800 sm:text-3xl">Tiện ích nổi bật</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-500">
            Những tiện ích nổi bật mang đến trải nghiệm nghỉ dưỡng trọn vẹn cho du khách.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredAmenities.map(amenity => (
            <AmenityCard key={amenity.id} amenity={amenity} variant="featured" />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedAmenities
