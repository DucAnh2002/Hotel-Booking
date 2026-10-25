import type { AxiosInstance } from 'axios'
import type { OrderFoodInput } from '../types/food.types'
export const foodApi = {
  // 1. Lấy danh sách menu món ăn
  getFoodList: async (client: AxiosInstance) => {
    const res = await client.get('api/v1/foods/list-food')
    return res.data.data
  },

  // 2. Lấy danh sách order món ăn của user hiện tại
  getMyFoodOrder: async (client: AxiosInstance) => {
    const res = await client.get('/api/v1/foods/my-orders')
    return res.data.data
  },

  // 3. Đặt món ăn mới
  orderFood: async (client: AxiosInstance, data: OrderFoodInput) => {
    const res = await client.post('/api/v1/foods/order', data)
    return res.data
  },

  // 4. Hủy/Xóa đơn đặt món
  removeFoodOrder: async (client: AxiosInstance, orderId: string) => {
    const res = await client.delete(`/api/v1/foods/remove/${orderId}`)
    return res.data
  }
}
