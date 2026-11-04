import type { AxiosInstance } from "axios";
import type {
  ApiResponse,
  CreateUserInput,
  UpdateUserInput,
  User,
  UserListResponse,
  UserRole,
  UserStatus,
} from "../types/user.types";

export const userApi = {
  getCurrentUser: async (client: AxiosInstance): Promise<User> => {
    const response = await client.get("/api/v1/users/me");

    return response.data.data;
  },

  getUsers: async (
    client: AxiosInstance,
    params: {
      search?: string;
      role?: string;
      status?: string;
      page?: number;
      limit?: number;
    } = {},
  ): Promise<UserListResponse> => {
    const response = await client.get<UserListResponse>("/api/v1/users/", {
      params,
    });

    return response.data;
  },

  createUser: async (
    client: AxiosInstance,
    data: CreateUserInput,
  ): Promise<User> => {
    const response = await client.post<ApiResponse<User>>(
      "/api/v1/users/employees",
      data,
    );

    return response.data.data;
  },

  updateUser: async (
    client: AxiosInstance,
    id: string,
    data: { role?: UserRole; status?: UserStatus },
  ): Promise<User> => {
    const response = await client.patch<ApiResponse<User>>(
      `/api/v1/users/${id}/role`,
      data,
    );

    return response.data.data;
  },
};
