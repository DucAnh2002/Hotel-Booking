import Header from '../../components/Layout/Header/Header'
import HotelsDisplay from '../../components/feature/hotel/HotelsDisplay'
import FoodsOrder from '../../components/feature/food/FoodsOrder'
import FloatingCart from '../../components/feature/cart/FloatingCart'
import HeroBanner from '../../components/feature/hero/HeroBanner'
const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <HeroBanner />
      <HotelsDisplay />
      <FoodsOrder />
      <FloatingCart />
    </div>
  )
}

export default Home
