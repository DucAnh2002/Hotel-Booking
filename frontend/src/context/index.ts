import { createContext } from 'react'
import type { RoomContextType } from '../types/roomContextType'
import type { FoodContextType } from '../types/foodTypes'

export const RoomContext = createContext({} as RoomContextType)
export const FoodContext = createContext({} as FoodContextType)
