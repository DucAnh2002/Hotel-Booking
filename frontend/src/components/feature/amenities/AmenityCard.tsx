import type { Amenity } from '../../../types/amenities.types'

interface AmenityCardProps {
  amenity: Amenity
  variant?: 'default' | 'featured'
}

const AmenityCard: React.FC<AmenityCardProps> = ({ amenity, variant = 'default' }) => {
  const isFeatured = variant === 'featured'
  return (
    <article
      className={[
        'group overflow-hidden rounded-xl bg-white',
        'border border-slate-200/80',
        'shadow-sm transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-lg',
        isFeatured ? 'h-full' : ''
      ].join(' ')}
    >
      {/* Image */}
      <div className={['relative overflow-hidden', isFeatured ? 'aspect-[16/10]' : 'aspect-[4/3]'].join(' ')}>
        <img
          src={amenity.image}
          alt={amenity.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col p-4">
        <h3 className="font-serif text-lg font-semibold text-slate-800">{amenity.title}</h3>

        <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500">{amenity.description}</p>

        {amenity.actionLabel && (
          <button
            type="button"
            className={[
              'mt-4 w-full rounded-md',
              'bg-[#d6a72c] px-4 py-2',
              'text-sm font-medium text-white',
              'transition-colors duration-200',
              'hover:bg-[#bd9121]'
            ].join(' ')}
          >
            {amenity.actionLabel}
          </button>
        )}
      </div>
    </article>
  )
}

export default AmenityCard
