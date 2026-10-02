import React from "react";

type BadgeStatus =
  | "occupied"
  | "vacant"
  | "cleaning"
  | "maintenance"
  | "pending"
  | "cooking"
  | "delivering"
  | "completed"
  | "confirmed"
  | "rejected";

interface ConfigItem {
  label: string;
  bg: string;
  text: string;
  border: string;
  dot: string;
}

const statusMap: Record<BadgeStatus, ConfigItem> = {
  occupied: {
    label: "Có Khách",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  vacant: {
    label: "Phòng trống",
    bg: "bg-slate-100",
    text: "text-slate-600",
    border: "border-slate-200",
    dot: "bg-slate-400",
  },
  cleaning: {
    label: "Đang dọn",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  maintenance: {
    label: "Bảo trì",
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    dot: "bg-rose-500",
  },
  pending: {
    label: "Mới tiếp nhận",
    bg: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-200",
    dot: "bg-sky-500",
  },
  cooking: {
    label: "Đang chế biến",
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
    dot: "bg-orange-500",
  },
  delivering: {
    label: "Đang giao",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
    dot: "bg-indigo-500",
  },
  completed: {
    label: "Hoàn thành",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  confirmed: {
    label: "Đã xác nhận",
    bg: "bg-teal-50",
    text: "text-teal-700",
    border: "border-teal-200",
    dot: "bg-teal-500",
  },
  rejected: {
    label: "Đã hủy/Từ chối",
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    dot: "bg-rose-500",
  },
};

export const StatusBadge: React.FC<{
  status: BadgeStatus;
  customLabel?: string;
}> = ({ status, customLabel }) => {
  const config = statusMap[status] || statusMap.vacant;

  return (
    <span
      className={
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.text} ${config.border}"
      }
    >
      <span className={"w-1.5 h-1.5 rounded-full #{config.dot}"} />
    </span>
  );
};
