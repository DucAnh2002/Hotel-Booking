import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
// @ts-ignore
import { assets } from '../../../assets/assets'

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  // Đổi màu navbar khi scroll
  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      return
    }
    const handleScroll = () => setScrolled(window.scrollY > 250)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 ${
        scrolled ? 'bg-cyan-100 shadow-md text-gray-800' : 'bg-transparent text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[100px] px-[60px] sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={assets.logo4} alt="Logo" className="h-[100px] w-auto object-cover m-0 p-0" />
        </div>

        {/* Links */}
        <nav className="hidden md:flex gap-5 items-center">
          <Link to="/" className="no-underline text-[27px] font-bold hover:text-[#002782] transition-colors">
            Home
          </Link>
          <Link to="/catering" className="no-underline text-[27px] font-bold hover:text-[#002782] transition-colors">
            Catering
          </Link>
          <Link to="/rooms" className="no-underline text-[27px] font-bold hover:text-[#002782] transition-colors">
            Rooms
          </Link>
          <a href="#footer" className="no-underline text-[27px] font-bold hover:text-[#002782] transition-colors">
            Contact
          </a>
        </nav>

        {/* Auth area */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-[18px] text-gray-800 hidden sm:inline">Xin chào, {user?.name}</span>
              <img src={user?.picture} alt="Avatar" className="w-[35px] h-[35px] rounded-full ml-[10px] object-cover" />
              <button
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                className="px-3 py-1 rounded bg-[#327ed0] text-white hover:bg-[#043569] transition-colors"
                type="button"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="px-3 py-1 rounded bg-[#007bff] text-white hover:bg-[#043569] transition-colors"
              type="button"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
