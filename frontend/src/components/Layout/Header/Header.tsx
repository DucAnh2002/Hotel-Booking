import Navbar from '../Navbar/Navbar'

const Header: React.FC = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <Navbar />
    </header>
  )
}

export default Header
