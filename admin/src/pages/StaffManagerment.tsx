import React from "react";
import { Header } from "../components/layout/Header";
import {
  Users,
  UserCheck,
  ShieldAlert,
  Search,
  Mail,
  Phone,
  Calendar,
  Filter,
} from "lucide-react";
import { useStaffManagement } from "../hooks/useStaffManagement";

import {
  roleLabels,
  statusLabels,
  roleStyles,
  statusStyles,
} from "../components/features/staff/constants/staff.constants";

export default function StaffManagement() {
  const {
    user,
    staff,
    loading,
    staffLoading,
    error,
    totalStaff,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    totalPages,
    showForm,
    setShowForm,
    form,
    setForm,
    saving,
    activeStaffCount,
    handleCreateStaff,
    handleToggleStatus,
  } = useStaffManagement();

  if (loading) {
    return (
      <div className="p-8 text-xs text-slate-500">
        Đang kiểm tra quyền truy cập...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 text-xs text-red-600">
        Không tìm thấy hồ sơ người dùng trong hệ thống.
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="pl-64 pt-16 min-h-screen bg-slate-50 p-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
          <ShieldAlert size={36} className="mx-auto text-rose-500 mb-2" />
          <h1 className="text-base font-bold text-slate-800">
            Không có quyền truy cập
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Chỉ quản trị viên mới được quản lý nhân sự.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pl-64 pt-16 min-h-screen bg-slate-50 p-8">
      {/* Header chuẩn giống GuestsPage */}
      <Header
        title="Quản lý nhân sự"
        primaryActionLabel="Thêm nhân viên"
        onPrimaryAction={() => setShowForm(true)}
      />

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-8">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">
              Tổng Nhân Sự
            </span>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              {totalStaff} nhân viên
            </div>
            <span className="text-xs text-slate-400 mt-1 inline-block">
              Theo bộ lọc hiện tại
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Users size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">
              Đang Hoạt Động
            </span>
            <div className="text-2xl font-bold text-emerald-600 mt-1">
              {activeStaffCount} nhân viên
            </div>
            <span className="text-xs text-emerald-600 font-medium mt-1 inline-block">
              Trang hiện tại
            </span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <UserCheck size={22} />
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm tên, email, số điện thoại..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tất cả vai trò</option>
            {Object.entries(roleLabels)
              .filter(([role]) => role !== "admin")
              .map(([role, label]) => (
                <option key={role} value={role}>
                  {label}
                </option>
              ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tất cả trạng thái</option>
            {Object.entries(statusLabels).map(([status, label]) => (
              <option key={status} value={status}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
          {error}
        </div>
      )}

      {/* Staff Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 font-bold uppercase border-b border-slate-200">
              <tr>
                <th className="p-3.5">Nhân viên</th>
                <th className="p-3.5">Liên hệ</th>
                <th className="p-3.5">Vai trò</th>
                <th className="p-3.5">Trạng thái</th>
                <th className="p-3.5">Ngày tạo</th>
                <th className="p-3.5 text-right">Thao tác</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {staffLoading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    Đang tải danh sách nhân sự...
                  </td>
                </tr>
              ) : staff.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    Không tìm thấy nhân viên phù hợp.
                  </td>
                </tr>
              ) : (
                staff.map((employee) => (
                  <tr
                    key={employee._id}
                    className="hover:bg-slate-50 transition"
                  >
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        {employee.avatar ? (
                          <img
                            src={employee.avatar}
                            alt=""
                            className="h-9 w-9 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700 text-xs">
                            {employee.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-slate-900 text-sm">
                            {employee.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            ID: {employee._id.slice(-6)}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 space-y-0.5">
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                        <Phone size={12} className="text-slate-400" />
                        <span>{employee.phone || "Chưa có SĐT"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                        <Mail size={12} />
                        <span>{employee.email}</span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${roleStyles[employee.role]}`}
                      >
                        {roleLabels[employee.role]}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyles[employee.status]}`}
                      >
                        {statusLabels[employee.status]}
                      </span>
                    </td>

                    <td className="p-3.5 text-slate-500">
                      {new Date(employee.createdAt).toLocaleDateString("vi-VN")}
                    </td>

                    <td className="p-3.5 text-right">
                      <button
                        type="button"
                        disabled={employee._id === user._id}
                        onClick={() => void handleToggleStatus(employee)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                      >
                        {employee.status === "active" ? "Khóa" : "Kích hoạt"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !saving) setShowForm(false);
          }}
        >
          <form
            onSubmit={handleCreateStaff}
            className="w-full max-w-lg space-y-4 rounded-xl bg-white p-6 shadow-2xl border border-slate-200"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Thêm nhân viên mới
                </h2>
                <p className="text-xs text-slate-500">
                  Tạo tài khoản và phân quyền cho nhân sự.
                </p>
              </div>
              <button
                type="button"
                disabled={saving}
                onClick={() => setShowForm(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Họ và tên
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nguyễn Văn A"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="nhanvien@example.com"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="0901234567"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Vai trò
                </label>
                <select
                  value={form.role}
                  onChange={(e) =>
                    setForm({ ...form, role: e.target.value as any })
                  }
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(roleLabels)
                    .filter(([role]) => role !== "admin")
                    .map(([role, label]) => (
                      <option key={role} value={role}>
                        {label}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                disabled={saving}
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? "Đang lưu..." : "Xác nhận tạo"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
