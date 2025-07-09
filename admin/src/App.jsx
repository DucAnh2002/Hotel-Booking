import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add.jsx";
import List from "./pages/List/List.jsx";
// import Order from "./pages/Order/Order.jsx";

import "./App.css";

function App() {
  const url = "http://localhost:5000/api";
  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            {/* <Route path="/order" element={<Order url={url} />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
