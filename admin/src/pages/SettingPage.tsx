import React, { useState } from "react";
import { Header } from "../components/layout/Header";
import {
  Clock,
  DollarSign,
  ShieldCheck,
  Bell,
  Globe,
  Save,
  Hotel,
  Key,
} from "lucide-react";

export const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<
    "general" | "pricing" | "auth0" | "notifications"
  >("general");

  return (
    <div className="pl-64 pt-16 min-h-screen bg-slate-50 p-8">
      <Header title="Cài Đặt Hệ Thống PMS" />

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar Menu Settings */}
        <div className="col-span-12 md:col-span-3">
          <div className="bg-white rounded-xl border border-slate-200 p-2 shadow-sm space-y-1">
            {[
              { id: "general", label: "Quy định Check-in/out", icon: Clock },
              { id: "pricing", label: "Cấu hình Giá & Thuế", icon: DollarSign },
              { id: "auth0", label: "Tích hợp Auth0 & Bảo mật", icon: Key },
              { id: "notifications", label: "Thông báo & Email", icon: Bell },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as any)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Form Area */}
        <div className="col-span-12 md:col-span-9 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          {activeSection === "general" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <Clock size={18} className="text-blue-600" />
                  Khung Giờ Quy Định Khách Sạn
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Cấu hình thời gian mặc định cho lượt tính phòng hàng ngày.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">
                    Giờ Check-in Tiêu Chuẩn
                  </label>
                  <input
                    type="time"
                    defaultValue="14:00"
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">
                    Giờ Check-out Tiêu Chuẩn
                  </label>
                  <input
                    type="time"
                    defaultValue="12:00"
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-xs font-bold text-slate-800 mb-2">
                  Phụ Phí Check-in Sớm / Out Trễ
                </h4>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2 text-slate-700">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>
                      Tự động tính 50% tiền phòng nếu Check-out từ 12:00 - 18:00
                    </span>
                  </label>
                  <label className="flex items-center gap-2 text-slate-700">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>
                      Tự động tính 100% tiền phòng nếu Check-out sau 18:00
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeSection === "pricing" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <DollarSign size={18} className="text-blue-600" />
                  Cấu Hình Thuế & Phí Dịch Vụ
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">
                    Thuế VAT (%)
                  </label>
                  <input
                    type="number"
                    defaultValue="8"
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">
                    Phí Dịch Vụ Hotel Service Fee (%)
                  </label>
                  <input
                    type="number"
                    defaultValue="5"
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === "auth0" && (
            <div className="space-y-4 text-xs">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <ShieldCheck size={18} className="text-blue-600" />
                Thông Tin Tích Hợp Auth0
              </h3>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Auth0 Domain
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue="dev-cnnu3x7aqtaw1ayk.us.auth0.com"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-600"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Client ID
                </label>
                <input
                  type="text"
                  readOnly
                  defaultValue="k6rkABHTeGuKU7p35dwk1T3VX7QFQHsv"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-600"
                />
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => alert("Đã lưu thiết lập hệ thống!")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-lg shadow transition active:scale-95"
            >
              <Save size={16} />
              <span>Lưu Cấu Hình</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
