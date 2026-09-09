import type { Amenity, ServiceHighlight } from '../../types/amenities.types'

export const serviceHighlights: ServiceHighlight[] = [
  {
    id: 'airport-transfer',
    title: 'Dịch vụ đưa đón sân bay',
    subtitle: 'Airport Transfer',
    description: 'Đón và tiễn sân bay tận nơi',
    icon: 'Plane',
    actionLabel: 'Đặt ngay →'
  },
  {
    id: 'bike-rental',
    title: 'Cho thuê xe máy & xe đạp',
    subtitle: 'Bike & Bike Rental',
    description: 'Thuê xe máy & xe đạp phục vụ hành trình',
    icon: 'Bike',
    actionLabel: 'Đặt ngay →'
  },
  {
    id: 'laundry',
    title: 'Dịch vụ giặt là',
    subtitle: 'Laundry Service',
    description: 'Nhận và giao đồ giặt tận phòng',
    icon: 'Shirt',
    actionLabel: 'Đặt / Gửi thật'
  },
  {
    id: 'local-tour',
    title: 'Tours tham quan địa phương',
    subtitle: 'Local Tours',
    description: 'Khám phá những điểm đến nổi bật tại Nha Trang',
    icon: 'Map',
    actionLabel: 'Đặt tour →'
  }
]

export const hotelAmenities: Amenity[] = [
  {
    id: 'breakfast',
    title: 'Bữa sáng buffet',
    description: 'Nhà hàng buffet đầy đủ món ăn sáng phong phú mỗi ngày.',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
    actionLabel: 'Đặt ngay',
    actionType: 'book'
  },
  {
    id: 'business-center',
    title: 'Không gian làm việc',
    description: 'Không gian làm việc hiện đại và tiện nghi cho công việc.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
    actionLabel: 'Đặt ngay',
    actionType: 'book'
  },
  {
    id: 'private-beach',
    title: 'Bãi biển riêng tư',
    description: 'Có bàn hoặc ghế và gazebos riêng hướng ra biển Nha Trang.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    actionLabel: 'Đặt ngay',
    actionType: 'book'
  },
  {
    id: 'kids-zone',
    title: 'Khu vui chơi trẻ em',
    description: 'Khu vui chơi dành cho trẻ em với nhiều hoạt động thú vị.',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80',
    actionLabel: 'Đặt ngay',
    actionType: 'book'
  },
  {
    id: 'meeting-room',
    title: 'Phòng họp',
    description: 'Không gian phòng họp được sắp xếp phù hợp cho các nhóm.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
    actionLabel: 'Đặt ngay',
    actionType: 'book'
  },
  {
    id: 'rooftop-bar',
    title: 'Bar sân thượng',
    description: 'Không gian trên cao với view thành phố và biển tuyệt đẹp.',
    image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=80',
    actionLabel: 'Đặt ngay',
    actionType: 'book'
  },
  {
    id: 'souvenir-shop',
    title: 'Cửa hàng lưu niệm',
    description: 'Cửa hàng lưu niệm với nhiều sản phẩm đặc trưng địa phương.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    actionLabel: 'Xem thêm',
    actionType: 'view'
  },
  {
    id: 'minibar',
    title: 'Minibar trong phòng',
    description: 'Minibar trong phòng với nhiều loại đồ uống và sản phẩm tiện lợi.',
    image: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&w=800&q=80',
    actionLabel: 'Đặt ngay',
    actionType: 'book'
  }
]

export const featuredAmenities: Amenity[] = [
  {
    id: 'infinity-pool',
    title: 'Bể bơi vô cực',
    description: 'View biển tuyệt đẹp cùng hồ bơi vô cực, mang đến trải nghiệm thư giãn hoàn hảo.',
    image: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1000&q=80',
    actionLabel: 'Xem chi tiết',
    actionType: 'view'
  },
  {
    id: 'spa-wellness',
    title: 'Spa & sức khỏe',
    description: 'Tận hưởng những liệu trình thư giãn và chăm sóc sức khỏe chuyên nghiệp.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    actionLabel: 'Xem chi tiết',
    actionType: 'view'
  },
  {
    id: 'modern-gym',
    title: 'Phòng Gym hiện đại',
    description: 'Không gian luyện tập hiện đại với đầy đủ thiết bị hỗ trợ sức khỏe.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    actionLabel: 'Xem chi tiết',
    actionType: 'view'
  },
  {
    id: 'conference-hall',
    title: ' hội nghị & sự kiện',
    description: 'Không gian hội nghị chuyên nghiệp cho các sự kiện và cuộc họp.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80',
    actionLabel: 'Xem chi tiết',
    actionType: 'view'
  }
]
