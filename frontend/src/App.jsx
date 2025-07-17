import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './pages/Home/Home.jsx'
import Catering from './pages/Catering/Catering.jsx'
import Footer from './components/Footer/Footer.jsx'
import Room from './pages/Room/Room.jsx'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cart from './pages/Cart/Cart.jsx'
function App() {
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    getAccessTokenSilently().then(token => {
      console.log('Access Token:', token)
    })
  }, [getAccessTokenSilently])
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Room />} />
        <Route path="/catering" element={<Catering />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-right" />
    </>
  )
}

export default App
