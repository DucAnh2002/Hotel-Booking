import React, { useState } from "react";
import { Header } from "../components/layout/Header";
import { StatusBadge } from "../components/ui/StatusBadge";
import { FoodOrder, OrderStatus } from "../types";
import {
  Clock,
  AlertCircle,
  ArrowRight,
  UtensilsCrossed,
  ChefHat,
  Truck,
  CheckCircle,
  Plus,
} from "lucide-react";

const mockOrders: FoodOrder[] = [
  {
    id: "1",
    orderCode: "ORD-405",
    roomNumber: "405",
    time: "12:20 PM",
    items: [
      { id: "i1", name: "Bít tết Bò Mỹ Sốt Tiêu", quantity: 1, price: 350000 },
      { id: "i2", name: "Rượu Vang Đỏ Cabernet", quantity: 1, price: 120000 },
    ],
    note: "Chín vừa (Medium-rare), không rưới sốt trực tiếp",
    totalPrice: 470000,
    status: "pending",
  },
  {
    id: "2",
    orderCode: "ORD-201",
    roomNumber: "201",
    time: "12:10 PM",
    items: [
      { id: "i3", name: "Phở Bò Wagyu Đặc Biệt", quantity: 2, price: 180000 },
    ],
    note: "Không lấy hành lá",
    totalPrice: 360000,
    status: "cooking",
  },
  {
    id: "3",
    orderCode: "ORD-102",
    roomNumber: "102",
    time: "11:45 AM",
    items: [
      { id: "i4", name: "Club Sandwich 3 Tầng", quantity: 1, price: 150000 },
      { id: "i5", name: "Nước Ép Cam Tươi", quantity: 1, price: 60000 },
    ],
    totalPrice: 210000,
    status: "delivering",
  },
  {
    id: "4",
    orderCode: "ORD-304",
    roomNumber: "304",
    time: "11:15 AM",
    items: [
      { id: "i6", name: "Cơm Chiên Hải Sản", quantity: 1, price: 140000 },
    ],
    totalPrice: 140000,
    status: "completed",
  },
];

export const FoodOrderPage: React.FC = () => {
  const [orders, setOrders] = useState<FoodOrder[]>(mockOrders);

  // Chuyển trạng thái đơn hàng (Workflow)
  const handleNextStatus = (orderId: string, currentStatus: OrderStatus) => {
    const statusMap: Record<OrderStatus, OrderStatus> = {
      pending: "cooking",
      cooking: "delivering",
      delivering: "completed",
      completed: "completed",
      rejected: "rejected",
    };

    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId ? { ...ord, status: statusMap[currentStatus] } : ord,
      ),
    );
  };

  const columns: {
    title: string;
    status: OrderStatus;
    icon: any;
    color: string;
  }[] = [
    {
      title: "Mới Tiếp Nhận",
      status: "pending",
      icon: UtensilsCrossed,
      color: "text-sky-600",
    },
    {
      title: "Bếp Đang Chế Biến",
      status: "cooking",
      icon: ChefHat,
      color: "text-orange-600",
    },
    {
      title: "Đang Giao Đến Phòng",
      status: "delivering",
      icon: Truck,
      color: "text-indigo-600",
    },
    {
      title: "Đã Hoàn Thành",
      status: "completed",
      icon: CheckCircle,
      color: "text-emerald-600",
    },
  ];

  return (
    <div className="pl-64 pt-16 min-h-screen bg-slate-50 p-8">
      <Header
        title="Quản lý Đặt Món (F&B Orders)"
        primaryActionLabel="Tạo Đơn Gọi Món"
        onPrimaryAction={() => alert("Mở Form Tạo Đơn F&B")}
      />

      {/* Bảng Kanban 4 Cột */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {columns.map((col) => {
          const Icon = col.icon;
          const colOrders = orders.filter((o) => o.status === col.status);

          return (
            <div
              key={col.status}
              className="bg-slate-100/80 rounded-xl p-4 border border-slate-200"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Icon size={18} className={col.color} />
                  <h3 className="font-bold text-slate-800 text-sm">
                    {col.title}
                  </h3>
                </div>
                <span className="bg-white border border-slate-200 text-slate-800 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                  {colOrders.length}
                </span>
              </div>

              <div className="space-y-4">
                {colOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow transition space-y-3"
                  >
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                      <div>
                        <span className="font-bold text-slate-900 text-base">
                          Phòng {order.roomNumber}
                        </span>
                        <p className="text-[10px] text-slate-400 font-mono">
                          {order.orderCode}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                        <Clock size={12} className="text-slate-400" />
                        <span>{order.time}</span>
                      </div>
                    </div>

                    {/* Danh sách món */}
                    <div className="space-y-1.5">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-xs"
                        >
                          <span className="text-slate-700 font-medium">
                            <strong className="text-blue-600 mr-1.5">
                              {item.quantity}x
                            </strong>
                            {item.name}
                          </span>
                          <span className="text-slate-500 font-semibold">
                            {item.price.toLocaleString()}đ
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Ghi chú đặc biệt */}
                    {order.note && (
                      <div className="flex items-start gap-1.5 bg-amber-50 border border-amber-200 rounded-lg p-2 text-[11px] text-amber-800">
                        <AlertCircle
                          size={13}
                          className="shrink-0 text-amber-600 mt-0.5"
                        />
                        <span>{order.note}</span>
                      </div>
                    )}

                    {/* Chân thẻ: Tổng tiền + Nút chuyển bước */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">
                          Tổng thanh toán
                        </p>
                        <p className="text-xs font-bold text-emerald-600">
                          {order.totalPrice.toLocaleString()} VNĐ
                        </p>
                      </div>

                      {order.status !== "completed" && (
                        <button
                          onClick={() =>
                            handleNextStatus(order.id, order.status)
                          }
                          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow transition active:scale-95"
                        >
                          <span>Tiếp</span>
                          <ArrowRight size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {colOrders.length === 0 && (
                  <div className="text-center py-8 text-xs text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                    Không có đơn hàng
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
