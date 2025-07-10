import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add.jsx";
import List from "./pages/List/List.jsx";
import OrderAndBooking from "./pages/OrdersAndBooking/OrdersAndBooking.jsx";

import "./App.css";

function App() {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const url = "http://localhost:5000/api";
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

  if (isLoading) {
    return (
      <>
        <Navbar />
        <p>Đang kiểm tra quyền truy cập...</p>
      </>
    );
  }

  return (
    <div className="app">
      <Navbar />
      {isAuthenticated ? (
        user?.email === adminEmail ? (
          <div className="main">
            <Sidebar />
            <div className="content">
              <Routes>
                <Route path="/add" element={<Add url={url} />} />
                <Route path="/list" element={<List url={url} />} />
                <Route path="/orders" element={<OrderAndBooking />} />
              </Routes>
            </div>
          </div>
        ) : (
          <p>Bạn không có quyền truy cập trang này.</p>
        )
      ) : (
        <p>Bạn chưa đăng nhập.</p>
      )}
    </div>
  );
}

export default App;
