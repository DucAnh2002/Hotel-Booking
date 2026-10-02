import React, { useState } from "react";
import { Header } from "../components/layout/Header";
import { StatusBadge } from "../components/ui/StatusBadge";
import { Room, RoomStatus } from "../types";
import {
  User,
  Clock,
  LogIn,
  LogOut,
  Wrench,
  Sparkles,
  Filter,
  BedDouble,
  CheckCircle2,
  AlertTriangle,
  Building2,
} from "lucide-react";

const mockRooms: Room[] = [
  {
    id: "1",
    roomNumber: "101",
    roomType: "Standard Single",
    status: "occupied",
    guestName: "Nguyễn Văn A",
    nights: 2,
  },
  { id: "2", roomNumber: "102", roomType: "Standard Single", status: "vacant" },
  {
    id: "3",
    roomNumber: "103",
    roomType: "Deluxe Double",
    status: "cleaning",
    notes: "Xong dự kiến 11:30",
  },
  {
    id: "4",
    roomNumber: "104",
    roomType: "Executive Suite",
    status: "maintenance",
    notes: "Bảo trì điều hòa",
  },
  {
    id: "5",
    roomNumber: "201",
    roomType: "Deluxe Double",
    status: "occupied",
    guestName: "Trần Thị B",
    nights: 1,
  },
  { id: "6", roomNumber: "202", roomType: "VIP Suite", status: "vacant" },
  {
    id: "7",
    roomNumber: "203",
    roomType: "Deluxe Double",
    status: "occupied",
    guestName: "Lê Hoàng C",
    nights: 4,
  },
  {
    id: "8",
    roomNumber: "204",
    roomType: "Standard Single",
    status: "cleaning",
    notes: "Thay ga trải giường",
  },
];

export const RoomBookingPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Lọc phòng theo trạng thái & loại phòng
  const filteredRooms = rooms.filter((room) => {
    const matchStatus = statusFilter === "all" || room.status === statusFilter;
    const matchType =
      typeFilter === "all" ||
      room.roomType.toLowerCase().includes(typeFilter.toLowerCase());
    return matchStatus && matchType;
  });

  // Tính toán thống kê
  const occupiedCount = rooms.filter((r) => r.status === "occupied").length;
  const vacantCount = rooms.filter((r) => r.status === "vacant").length;
  const cleaningCount = rooms.filter((r) => r.status === "cleaning").length;
  const maintenanceCount = rooms.filter(
    (r) => r.status === "maintenance",
  ).length;

  return (
    <div className="pl-64 pt-16 min-h-screen bg-slate-50 p-8">
      <Header
        title="Quản lý & Sơ đồ Phòng"
        primaryActionLabel="Đặt Phòng Mới"
        onPrimaryAction={() => alert("Mở Form Đặt Phòng Mới")}
      />

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">
              Phòng Đang Có Khách
            </span>
            <div className="text-2xl font-bold text-emerald-600 mt-1">
              {occupiedCount} phòng
            </div>
            <span className="text-xs text-slate-400 mt-1 inline-block">
              Công suất {((occupiedCount / rooms.length) * 100).toFixed(0)}%
            </span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <User size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">
              Phòng Trống Sẵn Sàng
            </span>
            <div className="text-2xl font-bold text-slate-800 mt-1">
              {vacantCount} phòng
            </div>
            <span className="text-xs text-emerald-600 font-medium mt-1 inline-block">
              Có thể check-in ngay
            </span>
          </div>
          <div className="p-3 bg-slate-100 text-slate-600 rounded-xl">
            <BedDouble size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">
              Đang Dọn / Vệ Sinh
            </span>
            <div className="text-2xl font-bold text-amber-600 mt-1">
              {cleaningCount} phòng
            </div>
            <span className="text-xs text-amber-600 font-medium mt-1 inline-block">
              Cần hoàn thành trước 14:00
            </span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Sparkles size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">
              Bảo Trì / Khóa Phòng
            </span>
            <div className="text-2xl font-bold text-rose-600 mt-1">
              {maintenanceCount} phòng
            </div>
            <span className="text-xs text-rose-500 font-medium mt-1 inline-block">
              Đang xử lý kỹ thuật
            </span>
          </div>
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <Wrench size={22} />
          </div>
        </div>
      </div>

      {/* Thanh Lọc (Filter Bar) */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-400" />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Lọc Trạng Thái:
          </span>
          <div className="flex gap-1.5 ml-2">
            {[
              { id: "all", label: "Tất cả" },
              { id: "occupied", label: "Có khách" },
              { id: "vacant", label: "Trống" },
              { id: "cleaning", label: "Đang dọn" },
              { id: "maintenance", label: "Bảo trì" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setStatusFilter(btn.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  statusFilter === btn.id
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Hạng Phòng:
          </span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả hạng phòng</option>
            <option value="standard">Standard</option>
            <option value="deluxe">Deluxe</option>
            <option value="suite">Suite / VIP</option>
          </select>
        </div>
      </div>

      {/* Lưới Phòng (Room Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="group relative bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-blue-400 transition flex flex-col justify-between min-h-40"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                  Phòng
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {room.roomNumber}
                </h3>
                <span className="text-[11px] font-medium text-slate-400">
                  {room.roomType}
                </span>
              </div>
              <StatusBadge status={room.status} />
            </div>

            <div className="my-3">
              {room.status === "occupied" && (
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <User size={13} className="text-blue-600" />
                    <span className="truncate">{room.guestName}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <Clock size={11} className="text-slate-400" />
                    <span>Lưu trú: {room.nights} đêm</span>
                  </div>
                </div>
              )}

              {room.status === "cleaning" && (
                <p className="text-xs text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-600 shrink-0" />
                  <span className="truncate">
                    {room.notes || "Đang vệ sinh"}
                  </span>
                </p>
              )}

              {room.status === "maintenance" && (
                <p className="text-xs text-rose-800 bg-rose-50 p-2 rounded-lg border border-rose-200 flex items-center gap-1.5">
                  <Wrench size={14} className="text-rose-600 shrink-0" />
                  <span className="truncate">
                    {room.notes || "Bảo trì thiết bị"}
                  </span>
                </p>
              )}

              {room.status === "vacant" && (
                <p className="text-xs text-slate-400 italic py-2">
                  Sẵn sàng nhận khách mới
                </p>
              )}
            </div>

            {/* Hover Action Overlay */}
            <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px] rounded-xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 p-3 z-10">
              {room.status === "vacant" && (
                <button
                  onClick={() => alert(`Check-in phòng ${room.roomNumber}`)}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow transition"
                >
                  <LogIn size={14} /> Check-in
                </button>
              )}
              {room.status === "occupied" && (
                <button
                  onClick={() => alert(`Check-out phòng ${room.roomNumber}`)}
                  className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow transition"
                >
                  <LogOut size={14} /> Check-out
                </button>
              )}
              <button
                onClick={() => alert(`Xem chi tiết phòng ${room.roomNumber}`)}
                className="bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-2 rounded-lg shadow transition"
              >
                Chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
