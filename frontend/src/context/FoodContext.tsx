import { useEffect, useState, useCallback } from 'react'
import { FoodContext } from './index'
import { useAuthApi } from '../hooks/useAuth'
import { foodApi } from '../api/food.api'
import { useAuth0 } from '@auth0/auth0-react'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import type { FoodOrder, FoodItem, FoodContextType, OrderFoodInput } from '../types/food.types'

interface ProviderProps {
  children: React.ReactNode
}

const FoodContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Record<string, number>>({})
  const [foodList, setFoodList] = useState<FoodItem[]>([])
  const [myFoodOrders, setMyFoodOrders] = useState<FoodOrder[]>([])

  const { isAuthenticated } = useAuth0()
  const { apiClient } = useAuthApi()

  // 1. Đặt món ăn
  const orderFood: FoodContextType['orderFood'] = async (data: OrderFoodInput) => {
    try {
      const { deliveryDate, deliveryTime } = data

      if (!deliveryDate || !deliveryTime) {
        toast.error('Vui lòng nhập đầy đủ thông tin.')
        return
      }

      const res = await foodApi.orderFood(apiClient, data)
      toast.success('Đặt món thành công!')
      await getMyfoodOrders() // Cập nhật lại danh sách sau khi đặt
      return res
    } catch (err: any) {
      console.error('Lỗi khi đặt món ăn:', err?.response?.data || err.message)
      toast.error(err?.response?.data?.message || 'Không thể đặt món!')
      throw err
    }
  }

  // 2. Lấy danh sách order của user
  const getMyfoodOrders = useCallback(async () => {
    try {
      const orders = await foodApi.getMyFoodOrder(apiClient)
      setMyFoodOrders(orders || [])
      return orders || []
    } catch (error: any) {
      console.error('Lỗi khi lấy danh sách Order', error.message)
      toast.error('Không thể lấy danh sách Order!')
      return []
    }
  }, [apiClient])

  useEffect(() => {
    if (isAuthenticated) {
      getMyfoodOrders()
    }
  }, [isAuthenticated, getMyfoodOrders])

  // 3. Lấy danh sách món ăn
  useEffect(() => {
    foodApi
      .getFoodList(apiClient)
      .then(data => setFoodList(data || []))
      .catch(err => console.error('Lỗi khi lấy dữ liệu món ăn:', err))
  }, [apiClient])

  // 4. Hủy/Xóa đơn món ăn
  const removeFoodFromCart: FoodContextType['removeFoodFromCart'] = async (orderId: string) => {
    confirmAlert({
      title: 'Xác nhận hủy món ăn',
      message: 'Bạn có chắc muốn hủy món ăn này?',
      buttons: [
        {
          label: 'Có',
          onClick: async () => {
            try {
              const res = await foodApi.removeFoodOrder(apiClient, orderId)

              if (res.success) {
                toast.success('Đã hủy món ăn!')
                await getMyfoodOrders()
              } else {
                toast.error(res.message || 'Không thể hủy món ăn!')
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

  // 5. Các hàm tính giá tiền
  const getFoodPrice: FoodContextType['getFoodPrice'] = item => {
    return Number(item.price) * Number(item.quantity)
  }

  const getFoodTotalPrice: FoodContextType['getFoodTotalPrice'] = () => {
    return myFoodOrders.reduce((total, item) => {
      return total + Number(item.price) * Number(item.quantity)
    }, 0)
  }

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
