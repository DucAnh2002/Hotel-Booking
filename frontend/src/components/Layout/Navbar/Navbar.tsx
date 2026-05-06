import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
// @ts-ignore
import { assets } from '../../../assets/assets'

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow text-gray-800' : 'bg-transparent text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[70px] px-4 sm:px-6 relative">
        {/* Logo */}
        <img src={assets.logo4} alt="Logo" className="h-12 object-contain" />

        {/* Links; Desktop menu */}
        <nav className="hidden md:flex gap-6 font-bold">
          <Link to="/">Home</Link>
          <Link to="/catering">Catering</Link>
          <Link to="/rooms">Rooms</Link>
          <a href="#footer">Contact</a>
        </nav>

        {/* Auth area */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* <span className="text-[18px] text-gray-800 hidden sm:inline">Xin chào, {user?.name}</span> */}
              <img src={user?.picture} alt="Avatar" className="w-8 h-8 rounded-full" />
              <button
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                className="px-3 py-1  bg-blue-600 text-white hover:bg-[#043569] transition-colors rounded"
                type="button"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="px-3 py-1  bg-[#007bff] text-white hover:bg-[#043569] transition-colors rounded"
              type="button"
            >
              Đăng nhập
            </button>
          )}
        </div>
        {/* Mobile menu button */}
        <button className="md:hidden text-2xl z-[999] relative" onClick={() => setOpen(!open)}>
          {open ? '✕' : '☰'}
        </button>
      </div>
      {/* Mobile menu */}
      <div
        className={`
    absolute top-[70px] right-4 z-[999]
    bg-white text-black shadow-xl rounded-xl p-4 w-[100px]
    transition-all duration-500 ease-in-out origin-top-right
    ${open ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'}
  `}
      >
        <nav className="flex flex-col gap-3 text-sm font-bold">
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/catering" onClick={() => setOpen(false)}>
            Catering
          </Link>
          <Link to="/rooms" onClick={() => setOpen(false)}>
            Rooms
          </Link>
          <a href="#footer" onClick={() => setOpen(false)}>
            Contact
          </a>
        </nav>
        <div className="border-t my-3" />
        <div>
          {isAuthenticated ? (
            <button
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
