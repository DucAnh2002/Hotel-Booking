import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import Catering from "./pages/Catering/Catering.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Room from "./pages/Room/Room.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Room />} />
        <Route path="/catering" element={<Catering />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
