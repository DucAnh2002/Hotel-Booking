export type UserRole = "admin" | "manager" | "reception" | "restaurant";

export type UserStatus = "active" | "inactive" | "suspended";

export interface User {
  _id: string;
  auth0Id?: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  phone: string;
  role: Exclude<UserRole, "admin">;
}

export interface UpdateUserInput {
  name?: string;
  phone?: string;
  role?: Exclude<UserRole, "admin">;
  status?: UserStatus;
}

export interface UserListResponse {
  success: boolean;
  data: User[];
  total: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
