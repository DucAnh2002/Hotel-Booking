import Header from '../../components/Layout/Header/Header'
import BookingSearch from '../../components/feature/search/BookingSearch'
import HotelsDisplay from '../../components/feature/hotel/HotelsDisplay'
import FoodsOrder from '../../components/feature/food/FoodsOrder'
import FloatingCart from '../../components/feature/cart/FloatingCart'
import HeroBanner from '../../components/feature/hero/HeroBanner'
import HotelHighlight from '../../components/feature/hotel/HotelHighlight'
const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <HeroBanner />
      <div className="relative z-40 -mt-20 lg:-mt-28">
        <BookingSearch />
      </div>
      <HotelsDisplay />
      <FoodsOrder />
      <HotelHighlight />
      <FloatingCart />
    </div>
  )
}

export default Home
