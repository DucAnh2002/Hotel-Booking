import "./Navbar.css";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [menu, setMenu] = useState();
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={assets.logo2} alt="Logo" className="logo" />
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

        <a
          href="#footer"
          onClick={() => setMenu("contact")}
          className={`navbar-link ${menu === "contact-us" ? "active" : ""}`}
        >
          Contact
        </a>
      </div>
      <div className="navbar-menu">
        {isAuthenticated ? (
          <>
            <span>Xin chào, {user.name}</span>
            <img src={user.picture} alt="Avatar" className="avatar" />
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <button onClick={loginWithRedirect}>Đăng nhập</button>
        )}
      </div>
    </div>
  );
}
