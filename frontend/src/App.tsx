import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Layout/Navbar/Navbar'
import Home from './pages/Home/Home'
import Catering from './pages/Catering/Catering'
import Footer from './components/Layout/Footer/Footer'
import Room from './pages/Room/Room'
import Cart from './pages/Cart/Cart'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    getAccessTokenSilently().then(token => {
      console.log('Access Token:', token)
    })
  }, [getAccessTokenSilently])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Room />} />
          <Route path="/catering" element={<Catering />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>

      <Footer />

      <ToastContainer position="top-right" />
    </div>
  )
}

export default App
