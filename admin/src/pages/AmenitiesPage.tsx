import React, { useState } from "react";
import { Header } from "../components/layout/Header";
import { StatusBadge } from "../components/ui/StatusBadge";
import { AmenityBooking } from "../types";
import {
  Sparkles,
  Dumbbell,
  Waves,
  Clock,
  User,
  Calendar,
  AlertCircle,
  MoreHorizontal,
  Check,
  X,
  TrendingUp,
} from "lucide-react";

const initialBookings: AmenityBooking[] = [
  {
    id: "1",
    bookingCode: "SPA-801",
    guestName: "Nguyễn Thị Minh",
    roomNumber: "502",
    serviceName: "Massage Thụy Điển Toàn Thân (60p)",
    timeSlot: "09:00 - 10:00",
    date: "18/09/2026",
    status: "confirmed",
  },
  {
    id: "2",
    bookingCode: "GYM-104",
    guestName: "Trần Văn Hoàng",
    roomNumber: "301",
    serviceName: "Thuê HLV Cá Nhân (PT 1:1)",
    timeSlot: "10:00 - 11:00",
    date: "18/09/2026",
    status: "confirmed",
  },
  {
    id: "3",
    bookingCode: "SPA-802",
    guestName: "Lê Hoàng Nam",
    roomNumber: "405",
    serviceName: "Chăm Sóc Da Mặt Đá Nóng (90p)",
    timeSlot: "14:00 - 15:30",
    date: "18/09/2026",
    status: "pending",
  },
];

const timeSlotsData = [
  { time: "08:00 - 09:00", booked: 4, capacity: 4 },
  { time: "09:00 - 10:00", booked: 4, capacity: 4 },
  { time: "10:00 - 11:00", booked: 3, capacity: 4 },
  { time: "11:00 - 12:00", booked: 1, capacity: 4 },
  { time: "14:00 - 15:00", booked: 4, capacity: 4 },
  { time: "15:00 - 16:00", booked: 2, capacity: 4 },
  { time: "16:00 - 17:00", booked: 0, capacity: 4 },
];

export const AmenitiesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"spa" | "gym" | "pool">("spa");
  const [bookings, setBookings] = useState<AmenityBooking[]>(initialBookings);

  const handleStatusChange = (
    id: string,
    newStatus: "confirmed" | "cancelled",
  ) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)),
    );
  };

  return (
    <div className="pl-64 pt-16 min-h-screen bg-slate-50 p-8">
      <Header
        title="Đặt Lịch Tiện Ích & Spa"
        primaryActionLabel="Tạo Lịch Đặt Mới"
        onPrimaryAction={() => alert("Mở Form Đặt Lịch Tiện Ích")}
      />

      {/* Thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">
              Tổng Lịch Đặt Hôm Nay
            </span>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              28 lượt
            </div>
            <span className="text-xs text-emerald-600 font-medium mt-1 inline-flex items-center gap-1">
              <TrendingUp size={12} /> +15% so với hôm qua
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Calendar size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">
              Công Suất Thượng Uyển Spa
            </span>
            <div className="text-2xl font-bold text-slate-900 mt-1">85%</div>
            <span className="text-xs text-amber-600 font-medium mt-1 inline-block">
              Chỉ còn 3 khung giờ trống
            </span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Sparkles size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">
              Yêu Cầu Chờ Duyệt
            </span>
            <div className="text-2xl font-bold text-amber-600 mt-1">
              3 yêu cầu
            </div>
            <span className="text-xs text-slate-400 font-medium mt-1 inline-block">
              Cần xử lý trong 15p
            </span>
          </div>
          <div className="p-3 bg-amber-100/60 text-amber-700 rounded-xl">
            <AlertCircle size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">
              Doanh Thu Tiện Ích/Ngày
            </span>
            <div className="text-2xl font-bold text-emerald-600 mt-1">
              18,400,000 đ
            </div>
            <span className="text-xs text-emerald-600 font-medium mt-1 inline-block">
              Đã thanh toán 80%
            </span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <TrendingUp size={22} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6">
        {[
          { id: "spa", label: "Thượng Uyển Spa & Wellness", icon: Sparkles },
          { id: "gym", label: "Phòng Gym & Yoga Studio", icon: Dumbbell },
          { id: "pool", label: "Hồ Bơi Vô Cực & Cabana", icon: Waves },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold transition-all border-b-2 -mb-px ${
                isActive
                  ? "border-blue-600 text-blue-600 bg-white rounded-t-lg"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="font-bold text-slate-800 text-sm border-b pb-2">
            Lịch Giường & Khung Giờ
          </h3>
          {timeSlotsData.map((slot, index) => {
            const isFull = slot.booked === slot.capacity;
            return (
              <div
                key={index}
                className={`p-3 rounded-lg border text-xs flex items-center justify-between ${isFull ? "bg-rose-50 border-rose-200 text-rose-800" : "bg-slate-50 border-slate-200 text-slate-700"}`}
              >
                <span className="font-bold">{slot.time}</span>
                <span className="font-semibold">
                  {isFull
                    ? "Kín lịch"
                    : `Trống ${slot.capacity - slot.booked} giường`}
                </span>
              </div>
            );
          })}
        </div>

        <div className="col-span-12 lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 font-bold uppercase border-b border-slate-200">
              <tr>
                <th className="p-3">Mã & Khách hàng</th>
                <th className="p-3">Dịch vụ & Khung giờ</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="p-3 font-medium">
                    <div className="font-bold text-slate-900 font-mono">
                      {b.bookingCode}
                    </div>
                    <div className="text-slate-500">
                      P.{b.roomNumber} - {b.guestName}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="font-semibold text-slate-800">
                      {b.serviceName}
                    </div>
                    <div className="text-slate-400">{b.timeSlot}</div>
                  </td>
                  {/* <td className="p-3">
                    <StatusBadge status={b.status} />
                  </td> */}
                  <td className="p-3 text-right">
                    {b.status === "pending" ? (
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => handleStatusChange(b.id, "confirmed")}
                          className="p-1 bg-emerald-100 text-emerald-700 rounded"
                        >
                          <Check size={14} />
                        </button>
                        <button
                          onClick={() => handleStatusChange(b.id, "cancelled")}
                          className="p-1 bg-rose-100 text-rose-700 rounded"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <MoreHorizontal
                        size={16}
                        className="text-slate-400 ml-auto"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
