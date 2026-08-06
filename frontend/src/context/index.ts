import { createContext } from 'react'
import type { RoomContextType } from '../types/room-context.type'
import type { FoodContextType } from '../types/food.types'

export const RoomContext = createContext({} as RoomContextType)
export const FoodContext = createContext({} as FoodContextType)
