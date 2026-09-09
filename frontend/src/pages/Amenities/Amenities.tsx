import AmenityHeader from '../../components/feature/amenities/AmenityHeader.tsx'
import ServiceHighlightList from '../../components/feature/amenities/ServiceHighlightList.tsx'
import AmenityOverview from '../../components/feature/amenities/AmenityOverview'
import FeaturedAmenities from '../../components/feature/amenities/FeaturedAmenities'

const Amenities: React.FC = () => {
  return (
    <div className="min-h-screen bg-amber-100 pt-8 pb-1">
      <AmenityHeader />
      <ServiceHighlightList />
      <AmenityOverview />
      <FeaturedAmenities />
    </div>
  )
}

export default Amenities
