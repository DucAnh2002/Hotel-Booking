export interface Amenity {
  id: string
  title: string
  description: string
  image: string
  actionLabel?: string
  actionType?: 'book' | 'view'
}

export interface ServiceHighlight {
  id: string
  title: string
  subtitle: string
  description: string
  icon: string
  actionLabel: string
}
