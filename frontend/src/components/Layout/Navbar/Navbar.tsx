import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

// @ts-ignore
import { assets } from '../../../assets/assets'

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()

  const [scrolled, setScrolled] = useState(false)

  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      if (isHome) {
        setScrolled(window.scrollY > 250)
      } else {
        setScrolled(true)
      }
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isHome])
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-gray-900/95 shadow-lg backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div
        className="
  mx-auto
  flex
  h-[70px]
  w-full
  max-w-7xl
  items-center
  gap-2
  px-4
  sm:gap-4
  sm:px-6
"
      >
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img src={assets.logo4} alt="Logo" className="h-12 w-auto object-contain" />
        </Link>

        {/* Menu */}
        <nav className="flex min-w-0 flex-1 items-center justify-center gap-3 sm:gap-4 md:gap-5">
          <Link
            to="/"
            className="shrink-0 whitespace-nowrap text-[10px] font-medium text-white transition hover:text-[#d9a928] sm:text-sm sm:font-bold md:text-base"
          >
            Trang chủ
          </Link>

          <Link
            to="/rooms"
            className="shrink-0 whitespace-nowrap text-[10px] font-medium text-white transition hover:text-[#d9a928] sm:text-sm sm:font-bold md:text-base"
          >
            Phòng
          </Link>

          <Link
            to="/catering"
            className="shrink-0 whitespace-nowrap text-[10px] font-medium text-white transition hover:text-[#d9a928] sm:text-sm sm:font-bold md:text-base"
          >
            Ẩm thực
          </Link>

          <Link
            to="/amenities"
            className="shrink-0 whitespace-nowrap text-[10px] font-medium text-white transition hover:text-[#d9a928] sm:text-sm sm:font-bold md:text-base"
          >
            Tiện ích
          </Link>
        </nav>

        {/* Auth */}
        <div className="flex shrink-0 items-center gap-2">
          {isAuthenticated ? (
            <>
              <img src={user?.picture} alt="Avatar" className="h-8 w-8 rounded-full object-cover" />

              <button
                type="button"
                onClick={() =>
                  logout({
                    logoutParams: {
                      returnTo: window.location.origin
                    }
                  })
                }
                className="
                  rounded-full
                  bg-blue-600
                  px-2
                  py-1
                  text-[9px]
                  font-medium
                  text-white
                  transition
                  hover:bg-blue-700

                  sm:px-3
                  sm:py-1.5
                  sm:text-sm
                "
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => loginWithRedirect()}
              className="
                shrink-0
                rounded-full
                bg-[#d9a928]
                px-2
                py-1
                text-[9px]
                font-medium
                text-white
                transition
                hover:bg-[#c49520]

                sm:px-4
                sm:py-1.5
                sm:text-sm
              "
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
