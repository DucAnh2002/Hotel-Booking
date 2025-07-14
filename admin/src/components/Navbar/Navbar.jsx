import "./Navbar.css";
import { assets } from "../../assets/assets.js";
import { useAuth0 } from "@auth0/auth0-react";
const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  // const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  // if (!isAuthenticated || user?.email !== adminEmail) return null;
  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="logo" />
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
};

export default Navbar;
