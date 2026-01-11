export interface FoodItem {
  _id: number
  name: string
  image: string
  price: number
  quantity?: number
  category?: string
  description?: string
}

export interface FoodOrder {
  _id: string
  name: string
  image: string
  price: number
  quantity: number
  deliveryDate: string
  deliveryTime: string
  note?: string
  createdAt?: string
}

// Dữ liệu mà user gửi khi đặt món
export interface OrderFoodInput {
  name: string
  image: string
  price: number
  quantity: number
  deliveryDate: string
  deliveryTime: string
  note?: string
}

export interface FoodContextType {
  cartItems: Record<string, number>
  myFoodOrders: FoodOrder[]
  setCartItems: React.Dispatch<React.SetStateAction<Record<string, number>>>
  foodList: FoodItem[]

  orderFood: (data: OrderFoodInput) => Promise<any>
  removeFoodFromCart: (orderId: string) => Promise<void>
  getMyfoodOrders: () => Promise<any>
  getFoodTotalPrice: () => number
  getFoodPrice: (item: FoodOrder) => number
}
