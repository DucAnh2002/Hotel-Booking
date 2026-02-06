declare module '../../context' {
  import React from 'react'
  import type { RoomContextType } from '../types/roomContextType'

  export const RoomContext: React.Context<RoomContextType>
}
