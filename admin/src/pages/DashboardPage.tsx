import React from "react";
import {
  TrendingUp,
  BedDouble,
  UtensilsCrossed,
  Dumbbell,
  UserCheck,
  CheckCircle2,
  Wrench,
  Clock,
} from "lucide-react";

export const DashboardPage: React.FC = () => {
  return (
    <>
      <div className="space-y-6 pl-64 min-h-screen p-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            BẢNG ĐIỀU KHIỂN
          </h1>
          <p className="text-sm text-slate-500">
            Tổng quan hoạt động khách sạn hôm nay
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Doanh thu
              </p>
              <p className="text-xs font-bold text-slate-900 mt-1">85.2M</p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              <TrendingUp size={24} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Đặt phòng
              </p>
              <p className="text-xs font-bold text-slate-900 mt-1">24</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <BedDouble size={24} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Đơn F&B
              </p>
              <p className="text-xs font-bold text-slate-900 mt-1">24</p>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
              <UtensilsCrossed size={24} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Tiện ích
              </p>
              <p className="text-xs font-bold text-slate-900 mt-1">24</p>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <Dumbbell size={24} />
            </div>
          </div>

          {/* Biểu đồ doanh thu giả lập  */}

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-800 text-lg">
                BIỂU ĐỒ DOANH THU{" "}
              </h2>

              <span className="text-xs font-medium text-slate-500">
                7 ngày gần nhất
              </span>
            </div>
            <div className="h-48 bg-slate-50 rounded-lg border border-dashed border-slate-200 flex items-end justify-between p-6 gap-2">
              {[40, 65, 30, 85, 55, 90, 75].map((val, idx) => (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div
                    style={{ height: `${val}%` }}
                    className="w-full bg-blue-600 hover:bg-blue-700 rounded-t-md transition-all"
                  />
                  <span className="text-xs text-slate-400">T{idx + 2}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tình trạng phòng & Đặt phòng gần đây */}
          <div className="grid grid-cols-1">
            {/* TÌNH TRẠNG PHÒNG */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-lg">
              <h2 className="font-bold text-slate-800 mb-4 pb-2 border-b border-slate-300">
                TÌNH TRẠNG PHÒNG
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2.5 bg-emerald-50 rounded-lg">
                  <UserCheck size={18} />
                  <span>Đang ở</span>
                </div>
                <span className="font-bold text-emerald-900 text-base">18</span>
              </div>

              <div className="flex justify-between items-center p-2.5 bg-amber-50 rounded-lg">
                <div className="flex items-center gap-2 text-blue-800 font-medium text-sm">
                  <CheckCircle2 size={18} />
                  <span>Đang dọn</span>
                </div>
                <span className="font-bold text-amber-900 text-base">3</span>
              </div>

              <div className="flex justify-between items-center p-2.5 bg-rose-50 rounded-lg">
                <div className="flex items-center gap-2 text-rose-800 font-medium text-sm">
                  <Wrench size={18} />
                  <span>Bảo trì</span>
                </div>
                <span className="font-bold text-rose-900 text-base">2</span>
              </div>
            </div>
          </div>

          {/* ĐẶT PHÒNG GẦN ĐÂY  */}

          {/* Đặt phòng gần đây */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-4 pb-2 border-b border-slate-300">
              ĐẶT PHÒNG GẦN ĐÂY
            </h2>
            <div className="divide-y divide-slate-100">
              {[
                { id: "#BK001", name: "Nguyễn Văn A", room: "P.201" },
                { id: "#BK002", name: "Trần Văn B", room: "P.305" },
                { id: "#BK003", name: "Lê Văn C", room: "P.102" },
              ].map((item) => (
                <div
                  key={item.id}
                  className="py-3 flex justify-between items-center text-sm"
                >
                  <div>
                    <p className="font-medium text-slate-800">{item.name}</p>
                    <p className="text-xs text-slate-400">{item.id}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs font-semibold">
                    {item.room}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hàng 3: Đơn F&B gần đây & Lịch tiện ích sắp tới */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Đơn F&B gần đây */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">
              ĐƠN F&B GẦN ĐÂY
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm p-2 bg-slate-50 rounded-lg">
                <span className="font-semibold text-slate-700">#ORD001</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                  Preparing
                </span>
              </div>
              <div className="flex justify-between items-center text-sm p-2 bg-slate-50 rounded-lg">
                <span className="font-semibold text-slate-700">#ORD002</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                  Completed
                </span>
              </div>
            </div>
          </div>

          {/* Lịch tiện ích sắp tới */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">
              LỊCH TIỆN ÍCH SẮP TỚI
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm p-2 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-1 text-slate-500 text-xs font-semibold">
                  <Clock size={14} /> 10:00
                </div>
                <span className="font-medium text-slate-800">
                  Spa Treatment
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm p-2 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-1 text-slate-500 text-xs font-semibold">
                  <Clock size={14} /> 11:30
                </div>
                <span className="font-medium text-slate-800">
                  Airport Transfer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
