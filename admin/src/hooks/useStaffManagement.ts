import { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "react-toastify";

import { useUser } from "../hooks/useUser";
import { useDebounce } from "../hooks/useDebounce";

import type { CreateUserInput, User, UserStatus } from "../types/user.types";

import {
  EMPTY_STAFF_FORM,
  PAGE_SIZE,
  statusLabels,
} from "../components/features/staff/constants/staff.constants";

export function useStaffManagement() {
  const {
    user,
    staff,
    loading,
    staffLoading,
    error,
    totalStaff,
    fetchStaff,
    createStaff,
    updateStaff,
  } = useUser();

  // STATE

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CreateUserInput>(EMPTY_STAFF_FORM);

  const [saving, setSaving] = useState(false);

  // SEARCH
  const debouncedSearch = useDebounce(search, 400);

  // FETCH STAFF

  const fetchParams = useMemo(
    () => ({
      search: debouncedSearch.trim() || undefined,
      role: roleFilter || undefined,
      status: statusFilter || undefined,
      page,
      limit: PAGE_SIZE,
    }),
    [debouncedSearch, roleFilter, statusFilter, page],
  );

  useEffect(() => {
    if (loading || user?.role !== "admin") return;

    void fetchStaff(fetchParams).catch(() => {});
  }, [loading, user?.role, fetchStaff, fetchParams]);

  // FILTER HANDLERS

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleRoleFilterChange = useCallback((value: string) => {
    setRoleFilter(value);
    setPage(1);
  }, []);

  const handleStatusFilterChange = useCallback((value: string) => {
    setStatusFilter(value);
    setPage(1);
  }, []);

  // CREATE STAFF

  const handleCreateStaff = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const payload: CreateUserInput = {
        ...form,
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
      };

      if (!payload.name || !payload.email) {
        toast.error("Vui lòng nhập họ tên và email");
        return;
      }

      setSaving(true);

      try {
        await createStaff(payload);

        toast.success("Tạo hồ sơ nhân viên thành công");

        setForm(EMPTY_STAFF_FORM);
        setShowForm(false);

        // Tải lại danh sách theo bộ lọc hiện tại
        await fetchStaff(fetchParams);
      } catch (err: any) {
        toast.error(
          err?.response?.data?.message ?? "Không thể tạo hồ sơ nhân viên",
        );
      } finally {
        setSaving(false);
      }
    },
    [form, createStaff, fetchStaff, fetchParams],
  );

  // TOGGLE STAFF STATUS

  const handleToggleStatus = useCallback(
    async (employee: User) => {
      if (employee._id === user?._id) {
        toast.info("Bạn không thể tự thay đổi trạng thái tài khoản");
        return;
      }

      const nextStatus: UserStatus =
        employee.status === "active" ? "inactive" : "active";

      const confirmed = window.confirm(
        `Bạn có muốn chuyển trạng thái của ${employee.name} thành "${statusLabels[nextStatus]}" không?`,
      );

      if (!confirmed) return;

      try {
        await updateStaff(employee._id, {
          status: nextStatus,
        });

        toast.success("Đã cập nhật trạng thái nhân viên");
      } catch (err: any) {
        toast.error(
          err?.response?.data?.message ?? "Không thể cập nhật trạng thái",
        );
      }
    },
    [user?._id, updateStaff],
  );

  // COMPUTED DATA

  const activeStaffCount = useMemo(
    () => staff.filter((item) => item.status === "active").length,
    [staff],
  );

  const totalPages = Math.max(1, Math.ceil(totalStaff / PAGE_SIZE));

  // RETURN

  return {
    // Data
    user,
    staff,
    totalStaff,
    activeStaffCount,
    totalPages,

    // Loading & Error
    loading,
    staffLoading,
    saving,
    error,

    // Search & Filters
    search,
    setSearch: handleSearchChange,

    roleFilter,
    setRoleFilter: handleRoleFilterChange,

    statusFilter,
    setStatusFilter: handleStatusFilterChange,

    // Pagination
    page,
    setPage,

    // Form
    showForm,
    setShowForm,
    form,
    setForm,

    // Actions
    handleCreateStaff,
    handleToggleStatus,
  };
}
