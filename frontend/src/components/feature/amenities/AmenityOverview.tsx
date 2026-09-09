import { BedDouble, Utensils, DoorOpen, Dumbbell, Waves, Projector } from 'lucide-react'
import { hotelAmenities } from '../../../data/Amenities/amenities.data'
import AmenityCard from './AmenityCard'

const amenityCategories = [
  {
    label: 'King bed',
    icon: BedDouble
  },
  {
    label: 'Bửa sáng',
    icon: Utensils
  },
  {
    label: 'Ban công',
    icon: DoorOpen
  },
  {
    label: 'Phòng Gym',
    icon: Dumbbell
  },
  {
    label: 'Spa view',
    icon: Waves
  },
  {
    label: 'Phòng họp',
    icon: Projector
  }
]
const AmenityOverview: React.FC = () => {
  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-1 lg:grid-cols-2">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-slate-800 sm:text-3xl">Tổng quan tiện ích khách sạn</h2>
            <p className="mt-2 text-sm text-slate-500">Vị trí an toàn, Ẩm thực phong phú</p>
          </div>
          {/* Category quick links */}
          <div className="mb-8 flex gap-5 overflow-x-auto pb-2">
            {amenityCategories.map(({ label, icon: Icon }) => (
              <button key={label} type="button" className="flex min-w-[70px] flex-col items-center gap-2 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8edc7] text-[#c69b28]">
                  <Icon size={20} strokeWidth={1.5} />
                </span>

                <span className=" text-[11px] font-medium text-slate-600">{label}</span>
              </button>
            ))}
          </div>
        </div>
        {/* {Cards} */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {hotelAmenities.map(amenity => (
            <AmenityCard key={amenity.id} amenity={amenity} />
          ))}
        </div>
      </div>
    </section>
  )
}
export default AmenityOverview
