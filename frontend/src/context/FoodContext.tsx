import { useEffect, useState } from 'react'
import { FoodContext } from './index'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import type { FoodOrder, FoodItem, FoodContextType, OrderFoodInput } from '../types/foodTypes'

interface ProviderProps {
  children: React.ReactNode
}

const FoodContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Record<string, number>>({})
  const [foodList, setFoodList] = useState<FoodItem[]>([])
  const [myFoodOrders, setMyFoodOrders] = useState<FoodOrder[]>([])

  const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
  const { getAccessTokenSilently } = useAuth0()

  // =======================
  //  ĐẶT MÓN ĂN
  // =======================
  const orderFood: FoodContextType['orderFood'] = async (data: OrderFoodInput) => {
    try {
      const { deliveryDate, deliveryTime } = data

      if (!deliveryDate || !deliveryTime) {
        toast.error('Vui lòng nhập đầy đủ thông tin.')
        return
      }

      const token = await getAccessTokenSilently()

      const response = await axios.post(`${url}/api/food/order`, data, {
        headers: { Authorization: `Bearer ${token}` }
      })

      toast.success('Đặt món thành công!')
      return response.data
    } catch (err: any) {
      console.error('Lỗi khi đặt món ăn:', err?.response?.data || err.message)
      toast.error(err?.response?.data?.message || 'Không thể đặt món!')
      throw err
    }
  }

  // =======================
  //  LẤY DANH SÁCH ORDER
  // =======================
  const getMyfoodOrders: FoodContextType['getMyfoodOrders'] = async () => {
    try {
      const token = await getAccessTokenSilently()

      const res = await axios.get(`${url}/api/food/my-orders`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setMyFoodOrders(res.data.data)
      return res.data
    } catch (error: any) {
      console.error('Lỗi khi lấy danh sách Order', error.message)
      toast.error('Không thể lấy danh sách Order!')
      return []
    }
  }

  // =======================
  //  LẤY LIST FOOD
  // =======================
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

  // =======================
  //  HỦY ORDER
  // =======================
  const removeFoodFromCart: FoodContextType['removeFoodFromCart'] = async (orderId: string) => {
    confirmAlert({
      title: 'Xác nhận hủy món ăn',
      message: 'Bạn có chắc muốn hủy món ăn này?',
      buttons: [
        {
          label: 'Có',
          onClick: async () => {
            try {
              const token = await getAccessTokenSilently()

              const res = await axios.delete(`${url}/api/food/remove/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` }
              })

              if (res.data.success) {
                toast.success('Đã hủy món ăn!')
                getMyfoodOrders()
              } else {
                toast.error(res.data.message || 'Không thể hủy món ăn!')
              }
            } catch (error) {
              console.error('Lỗi hủy món ăn', error)
              toast.error('Lỗi kết nối khi hủy món!')
            }
          }
        },
        { label: 'Không', onClick: () => {} }
      ]
    })
  }

  // =======================
  //  TÍNH GIÁ TIỀN
  // =======================
  const getFoodPrice: FoodContextType['getFoodPrice'] = item => {
    return Number(item.price) * Number(item.quantity)
  }

  const getFoodTotalPrice: FoodContextType['getFoodTotalPrice'] = () => {
    return myFoodOrders.reduce((total, item) => {
      return total + Number(item.price) * Number(item.quantity)
    }, 0)
  }

  // =======================
  //  GIÁ TRỊ CONTEXT
  // =======================
  const contextValue: FoodContextType = {
    cartItems,
    myFoodOrders,
    setCartItems,
    foodList,
    orderFood,
    removeFoodFromCart,
    getMyfoodOrders,
    getFoodTotalPrice,
    getFoodPrice
  }

  return <FoodContext.Provider value={contextValue}>{children}</FoodContext.Provider>
}

export default FoodContextProvider
