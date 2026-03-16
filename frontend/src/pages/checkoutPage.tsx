import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAuth0 } from '@auth0/auth0-react'

const CheckoutPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0()

  const state = location.state

  if (!state) {
    return (
      <div className="text-center mt-20">
        <p>Không có thông tin đặt phòng</p>
        <button onClick={() => navigate('/')} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          Quay về trang chủ
        </button>
      </div>
    )
  }

  const { hotel, checkInDate, checkOutDate, guests } = state

  const [totalPrice, setTotalPrice] = useState(0)
  const [showQR, setShowQR] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600)
  const [isPaid, setIsPaid] = useState(false)

  // tính tổng tiền
  useEffect(() => {
    const start = new Date(checkInDate)
    const end = new Date(checkOutDate)

    const nights = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)

    setTotalPrice(nights * hotel.price)
  }, [checkInDate, checkOutDate, hotel.price])

  // timer giữ phòng
  useEffect(() => {
    if (timeLeft <= 0) {
      toast.error('Hết thời gian giữ phòng')
      navigate('/')
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, navigate])

  // chặn refresh
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isPaid) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isPaid])

  const handleCash = () => {
    toast.info('Thanh toán tại khách sạn hiện chưa khả dụng. Vui lòng thanh toán online.')
  }

  const handleOnline = () => {
    setShowQR(true)
  }

  //  xử lý thanh toán thành công
  const handlePaymentSuccess = async () => {
    if (!isAuthenticated) {
      toast.error('Bạn cần đăng nhập')
      return
    }

    try {
      setIsPaid(true)

      const token = await getAccessTokenSilently()

      const res = await fetch('http://localhost:5000/api/booking/book-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          roomId: hotel._id,
          checkInDate,
          checkOutDate,
          guests,
          totalPrice,
          paymentMethod: 'bank_transfer'
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message)
      }

      toast.success('Đặt phòng thành công! Bạn sẽ được chuyển đến trang thông tin đặt phòng sau 2 giây.')

      // Chuyển sang trang my-booking sau khi đặt phòng thành công.
      setTimeout(() => {
        navigate('/cart')
      }, 2000)
      navigate('/payment-success')
    } catch (err) {
      console.error(err)
      toast.error('Không thể tạo booking')
      setIsPaid(false)
    }
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  // VietQR
  const vietQR = `https://img.vietqr.io/image/970436-1016800717-compact2.png?amount=${totalPrice}&addInfo=HotelBooking&accountName=HotelBooking`

  return (
    <div className="pt-[120px] px-6 max-w-[1100px] mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Xác nhận đặt phòng</h1>

      <p className="text-center text-red-500 mb-6">
        Giữ phòng trong: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* ROOM INFO */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Thông tin phòng</h2>

          <img
            src={hotel.images?.[0] ? `${import.meta.env.VITE_BACKEND_URL}${hotel.images[0]}` : '/room-demo.jpg'}
            className="rounded-lg mb-4 w-full h-[220px] object-cover"
          />

          <p>
            <b>Loại phòng:</b> {hotel.roomType}
          </p>
          <p>
            <b>Check-in:</b> {checkInDate}
          </p>
          <p>
            <b>Check-out:</b> {checkOutDate}
          </p>
          <p>
            <b>Số khách:</b> {guests}
          </p>

          <hr className="my-4" />

          <p className="text-lg font-bold text-green-600">Tổng tiền: {totalPrice.toLocaleString()} VND</p>
        </div>

        {/* PAYMENT */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Thông tin khách hàng</h2>

          <div className="flex items-center gap-4 mb-6">
            <img src={user?.picture} className="w-14 h-14 rounded-full" />

            <div>
              <p className="font-semibold">{user?.name}</p>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleOnline}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg w-full mb-3"
          >
            Thanh toán Online
          </button>

          <button onClick={handleCash} className="bg-gray-400 text-white px-6 py-3 rounded-lg w-full">
            Thanh toán tại khách sạn
          </button>

          {showQR && (
            <div className="mt-6 text-center">
              <h3 className="font-semibold mb-3">Quét QR để thanh toán</h3>

              <img src={vietQR} className="w-64 mx-auto" />

              <button onClick={handlePaymentSuccess} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded">
                Tôi đã thanh toán
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
