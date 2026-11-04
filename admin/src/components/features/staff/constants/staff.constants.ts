import type {
  CreateUserInput,
  UserRole,
  UserStatus,
} from "../../../../types/user.types";

export const PAGE_SIZE = 10;

export const roleLabels: Record<UserRole, string> = {
  admin: "Quản trị viên",
  manager: "Quản lý",
  reception: "Lễ tân",
  restaurant: "Nhân viên bếp",
};

export const statusLabels: Record<UserStatus, string> = {
  active: "Hoạt động",
  inactive: "Ngừng hoạt động",
  suspended: "Tạm khóa",
};

export const roleStyles: Record<UserRole, string> = {
  admin: "bg-violet-100 text-violet-700",
  manager: "bg-blue-100 text-blue-700",
  reception: "bg-indigo-100 text-indigo-700",
  restaurant: "bg-rose-100 text-rose-700",
};

export const statusStyles: Record<UserStatus, string> = {
  active: "bg-emerald-100 text-emerald-700",
  inactive: "bg-slate-100 text-slate-600",
  suspended: "bg-red-100 text-red-700",
};

export const EMPTY_STAFF_FORM: CreateUserInput = {
  name: "",
  email: "",
  phone: "",
  role: "reception",
};
