import React, { useState } from "react";
import { Header } from "../components/layout/Header";
import { Guest } from "../types";
import {
  Users,
  UserCheck,
  Crown,
  Search,
  Mail,
  Phone,
  CreditCard,
  ExternalLink,
  Filter,
} from "lucide-react";

const mockGuests: Guest[] = [
  {
    id: "1",
    fullName: "Nguyễn Văn An",
    phone: "0901 234 567",
    email: "nguyenvanan@gmail.com",
    identityCard: "001092008392",
    membershipTier: "VIP",
    totalStays: 8,
    totalSpent: 48500000,
    currentRoom: "P.101",
  },
  {
    id: "2",
    fullName: "Trần Thị Bích",
    phone: "0912 888 999",
    email: "bich.tran@company.com",
    identityCard: "025091001234",
    membershipTier: "Gold",
    totalStays: 4,
    totalSpent: 22100000,
    currentRoom: "P.201",
  },
  {
    id: "3",
    fullName: "Lê Hoàng Cường",
    phone: "0988 111 222",
    email: "cuong.le@gmail.com",
    identityCard: "038089004567",
    membershipTier: "Silver",
    totalStays: 2,
    totalSpent: 8900000,
  },
  {
    id: "4",
    fullName: "Pham Thu Trang",
    phone: "0977 333 444",
    email: "trang.pham@gmail.com",
    identityCard: "012095009876",
    membershipTier: "Bronze",
    totalStays: 1,
    totalSpent: 3200000,
  },
];

export const GuestsPage: React.FC = () => {
  const [guests] = useState<Guest[]>(mockGuests);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGuests = guests.filter(
    (g) =>
      g.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.phone.includes(searchTerm) ||
      g.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getTierBadge = (tier: Guest["membershipTier"]) => {
    switch (tier) {
      case "VIP":
        return (
          <span className="bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
            <Crown size={12} className="text-amber-600" /> VIP Diamond
          </span>
        );
      case "Gold":
        return (
          <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
            Gold Member
          </span>
        );
      case "Silver":
        return (
          <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
            Silver Member
          </span>
        );
      default:
        return (
          <span className="bg-orange-50 text-orange-700 border border-orange-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
            Bronze
          </span>
        );
    }
  };

  return (
    <div className="pl-64 pt-16 min-h-screen bg-slate-50 p-8">
      <Header
        title="Quản lý Khách Hàng (CRM)"
        primaryActionLabel="Thêm Hồ Sơ Khách"
        onPrimaryAction={() => alert("Mở Form Tạo Khách Hàng")}
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">
              Tổng Hồ Sơ Khách Hàng
            </span>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              1,240 khách
            </div>
            <span className="text-xs text-emerald-600 font-medium mt-1 inline-block">
              +48 khách mới tháng này
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Users size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">
              Khách Đang Lưu Trú
            </span>
            <div className="text-2xl font-bold text-emerald-600 mt-1">
              58 khách
            </div>
            <span className="text-xs text-slate-400 mt-1 inline-block">
              Tại 42 phòng
            </span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <UserCheck size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">
              Thành Viên VIP / Gold
            </span>
            <div className="text-2xl font-bold text-amber-600 mt-1">
              182 thành viên
            </div>
            <span className="text-xs text-amber-600 font-medium mt-1 inline-block">
              Chiếm 15% tổng lượng khách
            </span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Crown size={22} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">
              Tỷ Lệ Khách Quay Lại
            </span>
            <div className="text-2xl font-bold text-indigo-600 mt-1">34.2%</div>
            <span className="text-xs text-emerald-600 font-medium mt-1 inline-block">
              Tăng 3.5% so với quý trước
            </span>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <CreditCard size={22} />
          </div>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex justify-between items-center">
        <div className="relative w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Tìm tên khách, số điện thoại, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
        </div>

        <button className="flex items-center gap-2 border border-slate-200 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50">
          <Filter size={14} />
          <span>Bộ lọc nâng cao</span>
        </button>
      </div>

      {/* Bảng Danh Sách Khách Hàng */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 text-slate-600 font-bold uppercase border-b border-slate-200">
            <tr>
              <th className="p-3.5">Khách Hàng</th>
              <th className="p-3.5">Thông Tin Liên Hệ</th>
              <th className="p-3.5">CCCD / CMND</th>
              <th className="p-3.5">Hạng Thẻ</th>
              <th className="p-3.5">Lượt Lưu Trú</th>
              <th className="p-3.5">Tổng Chi Tiêu</th>
              <th className="p-3.5 text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredGuests.map((guest) => (
              <tr key={guest.id} className="hover:bg-slate-50 transition">
                <td className="p-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                      {guest.fullName.split(" ").pop()?.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">
                        {guest.fullName}
                      </div>
                      {guest.currentRoom && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">
                          Đang ở {guest.currentRoom}
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                <td className="p-3.5 space-y-0.5">
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <Phone size={12} className="text-slate-400" />
                    <span>{guest.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                    <Mail size={12} />
                    <span>{guest.email}</span>
                  </div>
                </td>

                <td className="p-3.5 font-mono text-slate-600 font-semibold">
                  {guest.identityCard}
                </td>

                <td className="p-3.5">{getTierBadge(guest.membershipTier)}</td>

                <td className="p-3.5 font-semibold text-slate-800">
                  {guest.totalStays} lần
                </td>

                <td className="p-3.5 font-bold text-emerald-600">
                  {guest.totalSpent.toLocaleString()} VNĐ
                </td>

                <td className="p-3.5 text-right">
                  <button className="text-blue-600 hover:text-blue-800 font-semibold hover:underline inline-flex items-center gap-1">
                    <span>Hồ sơ</span>
                    <ExternalLink size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
