import { serviceHighlights } from '../../../data/Amenities/amenities.data'
import ServiceHighlight from './ServiceHighlight'

const ServiceHighlightList: React.FC = () => {
  return (
    <section className="relative z-10 mx-auto -mt-10 max-w-6xl px-4">
      <div className="rounded-2xl bg-[#d6a72c] p-2 shadow-xl sm:p-3">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {serviceHighlights.map(service => (
            <ServiceHighlight key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
export default ServiceHighlightList
