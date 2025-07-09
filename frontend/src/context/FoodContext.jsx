import { useEffect, useState } from 'react'
import { FoodContext } from './index.js'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import { toast } from 'react-toastify'
const FoodContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({})
  const [foodList, setFoodList] = useState([])
  const [myFoodOrders, setMyFoodOrders] = useState([])
  const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
  const { getAccessTokenSilently } = useAuth0()

  //THÊM FOOD VÀO CART
  const orderFood = async ({ name, image, price, quantity, deliveryDate, deliveryTime, note }) => {
    try {
      // Kiểm tra dữ liệu đầu vào phía frontend
      if (!deliveryDate || !deliveryTime) {
        toast.error('❌ Vui lòng nhập đầy đủ thông tin bắt buộc.')
        return
      }

      const token = await getAccessTokenSilently()

      const orderData = {
        name,
        image,
        price,
        quantity,
        deliveryDate,
        deliveryTime,
        note: note || '' // cho phép note rỗng
      }

      const response = await axios.post(`${url}/api/food/order`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      toast.success('✅ Đặt món thành công!')
      return response.data
    } catch (err) {
      console.error('❌ Lỗi khi đặt món ăn:', err?.response?.data || err.message)
      toast.error(err?.response?.data?.message || 'Không thể đặt món. Vui lòng thử lại!')
      throw err
    }
  }

  //LẤY DANH SÁCH MÓN ĂN ĐÃ ĐẶT
  const getMyfoodOrders = async () => {
    try {
      const token = await getAccessTokenSilently()
      const res = await axios.get(`${url}/api/food/my-orders`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setMyFoodOrders(res.data.data)
      return res.data // Trả về danh sách foodOrder
    } catch (error) {
      console.error('Lỗi khi lấy danh sách Order', error.message)
      toast.error('Không thể lấy danh sách Order của bạn, vui lòng thử lại sau!')
      return []
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url + '/api/food/list-food')
        setFoodList(res.data.data)
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu món ăn:', err)
      }
    }

    fetchData()
  }, [])

  // xóa food trong cart
  const removeFromCart = itemId => {
    setCartItems(prev => {
      const updated = { ...prev }
      if (updated[itemId] > 1) updated[itemId] -= 1
      else delete updated[itemId]
      return updated
    })
  }

  const contextValue = {
    cartItems,
    myFoodOrders,
    setCartItems,
    foodList,
    orderFood,
    removeFromCart,
    getMyfoodOrders
  }

  return <FoodContext.Provider value={contextValue}>{children}</FoodContext.Provider>
}

export default FoodContextProvider
