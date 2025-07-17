import './Navbar.css'
import { Link, useLocation } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export default function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const isHome = location.pathname === '/'

  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      return
    }

    const handleScroll = () => {
      if (window.scrollY > 350) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  return (
    <div className={`navbar ${scrolled ? 'scrolled' : 'transparent'}`}>
      <div className="navbar-logo">
        <img src={assets.logo4} alt="Logo" className="logo" />
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/catering" className="navbar-link">
          Catering
        </Link>
        <Link to="/rooms" className="navbar-link">
          Rooms
        </Link>
        <a href="#footer" className="navbar-link">
          Contact
        </a>
      </div>
      <div className="navbar-menu">
        {isAuthenticated ? (
          <>
            <span>Xin chào, {user.name}</span>
            <img src={user.picture} alt="Avatar" className="avatar" />
            <button onClick={() => logout({ returnTo: window.location.origin })}>Đăng xuất</button>
          </>
        ) : (
          <button onClick={loginWithRedirect}>Đăng nhập</button>
        )}
      </div>
    </div>
  )
}
