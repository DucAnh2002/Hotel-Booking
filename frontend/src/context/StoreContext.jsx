import foodItems from '../data/Foods/Foods.js'
import { createContext, useEffect, useState } from 'react'

export const StoreContext = createContext()

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({})
  const [foodList, setFoodList] = useState([])

  // add food items to the cart
  const addToCart = itemId => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }))
  }

  // remove food items from the cart
  const removeFromCart = itemId => {
    setCartItems(prev => {
      const updated = { ...prev }

      if (updated[itemId] > 1) updated[itemId] -= 1
      else {
        delete updated[itemId]
      }
      return updated
    })
  }

  // total amount
  const getTotalAmount = () => {
    let total = 0
    for (const itemId in cartItems) {
      const item = foodList.find(food => food.id === itemId)
      if (item) {
        total += item.price * cartItems[itemId]
      }
    }
    return total
  }

  // load food list
  useEffect(() => {
    setFoodList(foodItems)
  }, [])

  const contextValue = {
    cartItems,
    setCartItems,
    foodList,
    addToCart,
    removeFromCart,
    getTotalAmount
  }

  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>
}

export default StoreContextProvider
