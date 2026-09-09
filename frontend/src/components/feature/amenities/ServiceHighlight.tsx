import { Bike, Map, Plane, Shirt, type LucideIcon } from 'lucide-react'

import type { ServiceHighlight as ServiceHighlightType } from '../../../types/amenities.types'

interface ServiceHighlightProps {
  service: ServiceHighlightType
}

const iconMap: Record<string, LucideIcon> = {
  Plane,
  Bike,
  Shirt,
  Map
}

const ServiceHighlight: React.FC<ServiceHighlightProps> = ({ service }) => {
  const Icon = iconMap[service.icon] ?? Map // Default icon if not found

  return (
    <article className="flex min-h-[118px] flex-col justify-between rounded-lg border border-[#dfc77d] bg-white p-3 shadow-sm">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#f8edc7] text-[#c69b28]">
          <Icon size={22} strokeWidth={1.7} />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold leading-5  text-slate-800">{service.title}</h3>
          <p className="mt-0.5 text-[11px] font-medium text-slate-500">{service.subtitle}</p>
          <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-slate-500">{service.description}</p>
        </div>
      </div>
      <button
        type="button"
        className="mt-2 self-start text-[11px] font-semibold text-[#c5971e] transition-colors hover:text-[967418]"
      >
        {service.actionLabel}
      </button>
    </article>
  )
}
export default ServiceHighlight
