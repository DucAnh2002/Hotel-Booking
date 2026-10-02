import React from "react";
import { Search, Calendar, Bell, Plus } from "lucide-react";

interface HeaderProps {
  title: string;
  onPrimaryAction?: () => void;
  primaryActionLabel?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onPrimaryAction,
  primaryActionLabel,
}) => {
  return (
    <header className="h-16 bg-white ">
      <h1 className="text-xl font-bold text-slate-800">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="relative w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Tìm số phòng , tên khách, mã đơn..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
        </div>
        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600">
          <Calendar size={14} />
          <span>18/09/2026</span>
        </div>
        <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
        </button>

        {primaryActionLabel && onPrimaryAction && (
          <button
            onClick={onPrimaryAction}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition active:scale-95"
          >
            <Plus size={16} />
            <span>{primaryActionLabel}</span>
          </button>
        )}
      </div>
    </header>
  );
};
