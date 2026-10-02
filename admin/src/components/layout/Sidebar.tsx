import React from "react";
import { NavLink } from "react-router-dom";
import {
  ChartColumn,
  BedDouble,
  UtensilsCrossed,
  Dumbbell,
  Users,
  Settings,
  LogOut,
  Hotel,
  CircleDollarSign,
} from "lucide-react";
import { assets } from "../../assets/assets";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const navItems = [
    { path: "dashboard", label: "Bảng điều khiển", icon: ChartColumn },
    { path: "room", label: "Quản lý phòng", icon: BedDouble },
    { path: "food", label: "Quản lý đơn món (F&B)", icon: UtensilsCrossed },
    { path: "amenities", label: "Đặt tiện ích & Spa", icon: Dumbbell },
    { path: "guests", label: "Quản lý khách hàng", icon: Users },
    {
      path: "revenue",
      label: "Thanh toán & Doanh thu",
      icon: CircleDollarSign,
    },
    { path: "settings", label: "Cài đặt hệ thống", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 h-screen fixed left-0 top-0 flex flex-col justify-between z-20 border-r border-slate-800">
      <div>
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800">
          <div className="p-2 rounded-lg text-white">
            <img
              src={assets.logo}
              alt="Logo"
              className="h-12 w-auto object-contain"
            />
          </div>
          <div>
            <h1 className="font-bold text-white text-base leading-tight">
              Nha Trang Hotel
            </h1>
            {/* <span className="text-[10px] text-slate-400 tracking-wider font-semibold">
              ADMIN PMS v2.0
            </span> */}
          </div>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setActiveTab(item.path)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 p-2 bg-slate-800/50 rounded-lg">
          <div className="w-9 h-9 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
            LT
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Lễ Tân</p>
            <p className="text-xs text-slate-500 truncate"> Shift #1(Day)</p>
          </div>
          <button className="text-slate-400 hover:text-rose-400 p-1">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};
