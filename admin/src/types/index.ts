export type RoomStatus = "occupied" | "vacant" | "cleaning" | "maintenance";
export type RoomType =
  | "Standard Single"
  | "Deluxe Double"
  | "Executive Suite"
  | "VIP Suite";

export interface Room {
  id: string;
  roomNumber: string;
  roomType: RoomType;
  status: RoomStatus;
  guestName?: string;
  nights?: number;
  notes?: string;
}

export type OrderStatus =
  | "pending"
  | "cooking"
  | "delivering"
  | "completed"
  | "rejected";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface FoodOrder {
  id: string;
  orderCode: string;
  roomNumber: string;
  time: string;
  items: OrderItem[];
  note?: string;
  totalPrice: number;
  status: OrderStatus;
}

export interface AmenityBooking {
  id: string;
  bookingCode: string;
  guestName: string;
  roomNumber: string;
  serviceName: string;
  timeSlot: string;
  date: string;
  status: "confirmed" | "pending" | "cancelled";
}

export interface Guest {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  identityCard: string;
  membershipTier: "Bronze" | "Silver" | "Gold" | "VIP";
  totalStays: number;
  totalSpent: number;
  currentRoom?: string;
}
