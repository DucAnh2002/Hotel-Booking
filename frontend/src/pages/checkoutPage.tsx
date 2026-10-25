import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { toast } from 'react-toastify'

import { useAuthApi } from '../hooks/useAuth'
import { bookingApi } from '../api/booking.api'
import type { RoomType } from '../types/room.type'

interface CheckoutState {
  checkInDate: string
  checkOutDate: string
  guests: number
}

const HOLD_DURATION = 600
const CART_PATH = '/cart'

const CheckoutPage = () => {
  // Router
  const { roomId } = useParams<{ roomId: string }>()
  const location = useLocation()
  const navigate = useNavigate()

  // Auth
  const { user, isAuthenticated } = useAuth0()
  const { apiClient } = useAuthApi()

  // Dữ liệu chuyển từ trang trước
  const state = location.state as CheckoutState | null

  const checkInDate = state?.checkInDate ?? ''
  const checkOutDate = state?.checkOutDate ?? ''
  const guests = state?.guests ?? 1

  // State
  const [hotel, setHotel] = useState<RoomType | null>(null)
  const [totalPrice, setTotalPrice] = useState(0)
  const [timeLeft, setTimeLeft] = useState(HOLD_DURATION)

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [isPaid, setIsPaid] = useState(false)

  // 1. Lấy thông tin phòng
  const fetchRoom = useCallback(async () => {
    if (!roomId) {
      setHotel(null)
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)

      const room = await bookingApi.getRoomById(apiClient, roomId)

      if (!room) {
        throw new Error('Không tìm thấy dữ liệu phòng')
      }

      setHotel(room)
    } catch (error) {
      console.error('Lỗi lấy thông tin phòng:', error)
      setHotel(null)
      toast.error('Không thể tải thông tin phòng.')
    } finally {
      setIsLoading(false)
    }
  }, [apiClient, roomId])

  useEffect(() => {
    void fetchRoom()
  }, [fetchRoom])

  // 2. Tính giá theo số đêm
  useEffect(() => {
    if (!hotel || !checkInDate || !checkOutDate) {
      setTotalPrice(0)
      return
    }

    const start = new Date(checkInDate)
    const end = new Date(checkOutDate)

    const startTime = start.getTime()
    const endTime = end.getTime()

    if (!Number.isFinite(startTime) || !Number.isFinite(endTime) || endTime <= startTime) {
      setTotalPrice(0)
      return
    }

    const nights = Math.ceil((endTime - startTime) / (1000 * 60 * 60 * 24))

    setTotalPrice(nights * Number(hotel.price))
  }, [hotel, checkInDate, checkOutDate])

  // 3. Bộ đếm thời gian giữ phòng
  useEffect(() => {
    if (!state || isPaid || timeLeft <= 0) return

    const timerId = window.setTimeout(() => {
      setTimeLeft(previous => Math.max(0, previous - 1))
    }, 1000)

    return () => window.clearTimeout(timerId)
  }, [state, isPaid, timeLeft])

  // 4. Xử lý khi hết thời gian
  useEffect(() => {
    if (!state || isPaid || timeLeft > 0) return

    toast.error('Hết thời gian giữ phòng')
    navigate('/', { replace: true })
  }, [state, isPaid, timeLeft, navigate])

  // 5. Cảnh báo tải lại hoặc đóng tab
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isPaid && state) {
        event.preventDefault()
        event.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isPaid, state])

  // 6. Thanh toán tiền mặt chưa hỗ trợ
  const handleCash = useCallback(() => {
    toast.info('Thanh toán tại khách sạn hiện chưa khả dụng. Vui lòng thanh toán online.')
  }, [])

  // 7. Hiển thị QR
  const handleOnline = useCallback(() => {
    if (totalPrice <= 0) {
      toast.error('Ngày nhận phòng hoặc trả phòng không hợp lệ.')
      return
    }

    setShowQR(true)
  }, [totalPrice])

  // 8. Tạo booking
  const handlePaymentSuccess = useCallback(async () => {
    if (!isAuthenticated) {
      toast.error('Bạn cần đăng nhập')
      return
    }

    if (!hotel || !roomId) {
      toast.error('Không tìm thấy thông tin phòng.')
      return
    }

    if (isSubmitting || isPaid) return

    if (timeLeft <= 0) {
      toast.error('Đã hết thời gian giữ phòng.')
      return
    }

    if (totalPrice <= 0) {
      toast.error('Thông tin ngày đặt phòng không hợp lệ.')
      return
    }

    try {
      setIsSubmitting(true)

      const result = await bookingApi.bookRoom(apiClient, {
        roomId: String(hotel._id),
        checkInDate,
        checkOutDate,
        guests,
        paymentMethod: 'bank_transfer'
      })

      // Một số API trả success: false trong response dù HTTP 200.
      if (result?.success === false) {
        throw new Error(result.message || 'Không thể tạo booking.')
      }

      setIsPaid(true)
      toast.success('Đặt phòng thành công!')

      window.setTimeout(() => {
        navigate(CART_PATH)
      }, 2000)
    } catch (error) {
      console.error('Lỗi tạo booking:', error)
      toast.error(error instanceof Error ? error.message : 'Không thể tạo booking. Vui lòng thử lại.')
    } finally {
      setIsSubmitting(false)
    }
  }, [
    isAuthenticated,
    hotel,
    roomId,
    isSubmitting,
    isPaid,
    timeLeft,
    totalPrice,
    apiClient,
    checkInDate,
    checkOutDate,
    guests,
    navigate
  ])

  // 9. Các giá trị phục vụ UI
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const backendUrl = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000').replace(/\/$/, '')

  const roomImage = hotel?.image ? `${backendUrl}/upload/rooms/${hotel.image}` : '/room-demo.jpg'

  const vietQR =
    `https://img.vietqr.io/image/970436-1016800717-compact2.png` +
    `?amount=${totalPrice}` +
    `&addInfo=HotelBooking` +
    `&accountName=HotelBooking`

  // 10. UI: các nhánh return phải nằm sau toàn bộ hooks
  if (!state) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-gray-500">Không có thông tin đặt phòng</p>

        <button onClick={() => navigate('/')} className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white">
          Về trang chủ
        </button>
      </div>
    )
  }

  if (isLoading) {
    return <div className="mt-20 text-center">Đang tải thông tin phòng...</div>
  }

  if (!hotel) {
    return (
      <div className="mt-20 text-center">
        <p className="text-gray-500">Không tìm thấy thông tin phòng.</p>

        <button onClick={() => navigate('/')} className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white">
          Về trang chủ
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1100px] px-6 pt-[120px]">
      <h1 className="mb-8 text-center text-3xl font-bold">Xác nhận đặt phòng</h1>

      <p className="mb-6 text-center text-red-500">
        Giữ phòng trong: {minutes}:{String(seconds).padStart(2, '0')}
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Thông tin phòng */}
        <section className="rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold">Thông tin phòng</h2>

          <img src={roomImage} alt={hotel.roomType} className="mb-4 h-[220px] w-full rounded-lg object-cover" />

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

          <p className="text-lg font-bold text-green-600">Tổng tiền: {totalPrice.toLocaleString('vi-VN')} VND</p>
        </section>

        {/* Thông tin khách hàng và thanh toán */}
        <section className="rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold">Thông tin khách hàng</h2>

          <div className="mb-6 flex items-center gap-4">
            {user?.picture && <img src={user.picture} alt="Ảnh đại diện" className="h-14 w-14 rounded-full" />}

            <div>
              <p className="font-semibold">{user?.name || 'Khách hàng'}</p>

              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleOnline}
            disabled={isSubmitting || isPaid}
            className="mb-3 w-full rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Thanh toán Online
          </button>

          <button
            onClick={handleCash}
            disabled={isSubmitting || isPaid}
            className="mb-3 w-full rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:opacity-50"
          >
            Thanh toán khi nhận phòng
          </button>

          {showQR && (
            <div className="mt-6 text-center">
              <h3 className="mb-3 font-semibold">Quét QR để thanh toán</h3>

              <img src={vietQR} alt="Mã QR thanh toán" className="mx-auto w-64" />

              <p className="mt-3 text-sm text-gray-500">Số tiền: {totalPrice.toLocaleString('vi-VN')} VND</p>

              <button
                onClick={handlePaymentSuccess}
                disabled={isSubmitting || isPaid}
                className="mt-4 rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Đang xử lý...' : isPaid ? 'Đã đặt phòng' : 'Tôi đã thanh toán'}
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default CheckoutPage
