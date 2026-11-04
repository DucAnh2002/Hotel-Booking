import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { useAuthApi } from "../hooks/useAuth";
import { userApi } from "../api/user.api";
import { useAuth0 } from "@auth0/auth0-react";

import type {
  CreateUserInput,
  UpdateUserInput,
  User,
  UserStatus,
  UserRole,
} from "../types/user.types";

interface UserContextValue {
  user: User | null;
  staff: User[];
  loading: boolean;
  staffLoading: boolean;
  error: string | null;
  totalStaff: number;

  fetchUser: () => Promise<void>;
  fetchStaff: (params?: {
    search?: string;
    role?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) => Promise<void>;

  createStaff: (data: CreateUserInput) => Promise<void>;
  updateStaff: (id: string, data: UpdateUserInput) => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextValue | undefined>(
  undefined,
);

export function UserProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth0();
  const apiClient = useAuthApi();

  const [user, setUser] = useState<User | null>(null);
  const [staff, setStaff] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);
  const [staffLoading, setStaffLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalStaff, setTotalStaff] = useState(0);

  const fetchUser = useCallback(async () => {
    // kiểm tra đảm bảo token load xong mới gán -> gởi request
    if (isLoading) {
      return;
    }
    if (!isAuthenticated) {
      setLoading(false);
      setUser(null);
      return;
    }

    try {
      setLoading(true);
      const currentUser = await userApi.getCurrentUser(apiClient);
      setUser(currentUser);
    } catch (err: any) {
      setUser(null);
      setError(
        err?.response?.data?.message ?? "Không thể lấy thông tin người dùng",
      );
    } finally {
      setLoading(false);
    }
  }, [apiClient, isAuthenticated, isLoading]);
  useEffect(() => {
    if (!isLoading) {
      void fetchUser();
    }
  }, [fetchUser, isLoading]);

  const fetchStaff = useCallback(
    async (
      params: {
        search?: string;
        role?: string;
        status?: string;
        page?: number;
        limit?: number;
      } = {},
    ) => {
      setStaffLoading(true);
      setError(null);

      try {
        const result = await userApi.getUsers(apiClient, params);
        setStaff(result.data);
        setTotalStaff(result.total);
      } catch (err: any) {
        setStaff([]);
        setTotalStaff(0);
        setError(
          err?.response?.data?.message ?? "Không thể tải danh sách nhân sự",
        );
        throw err;
      } finally {
        setStaffLoading(false);
      }
    },
    [apiClient],
  );

  const createStaff = useCallback(
    async (data: CreateUserInput) => {
      await userApi.createUser(apiClient, data);
      await fetchStaff();
    },
    [apiClient],
  );

  const updateStaff = useCallback(
    async (id: string, data: { role?: UserRole; status?: UserStatus }) => {
      const updatedUser = await userApi.updateUser(apiClient, id, data);

      setStaff((current) =>
        current.map((item) =>
          item._id === updatedUser._id ? updatedUser : item,
        ),
      );

      if (user?._id === updatedUser._id) {
        setUser(updatedUser);
      }
    },
    [apiClient, user?._id],
  );

  return (
    <UserContext.Provider
      value={{
        user,
        staff,
        loading,
        staffLoading,
        error,
        totalStaff,
        fetchUser,
        fetchStaff,
        createStaff,
        updateStaff,
        refreshUser: fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
