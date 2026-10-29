import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  CalendarDays,
  BedDouble,
  UtensilsCrossed,
  ChartColumn,
  LogIn,
  Info,
} from "lucide-react";

export const WelcomePage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Gọi hàm đăng nhập chuyển hướng Auth0
    loginWithRedirect();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-3">
              Chào mừng đến với <br />
              <span className="text-blue-600">HotelAdmin</span>
            </h1>

            <p className="text-base font-semibold text-slate-700 mb-3">
              Nền tảng quản lý khách sạn tập trung và tiện lợi
            </p>

            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              HotelAdmin giúp bạn dễ dàng quản lý hoạt động khách sạn một cách
              hiệu quả, từ đặt phòng, quản lý phòng, khách hàng đến thanh toán
              và báo cáo. Đăng nhập để bắt đầu sử dụng hệ thống.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-100 flex gap-3 items-start">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                  <CalendarDays size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1">
                    Quản lý đặt phòng
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Theo dõi và xử lý các đặt phòng nhanh chóng, chính xác.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-100 flex gap-3 items-start">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                  <BedDouble size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1">
                    Quản lý phòng
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Quản lý tình trạng phòng, loại phòng, giá và tiện nghi.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-100 flex gap-3 items-start">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg shrink-0">
                  <UtensilsCrossed size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1">
                    Dịch vụ khách sạn
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Quản lý dịch vụ bổ sung, tiện ích và các gói dịch vụ.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-100 flex gap-3 items-start">
                <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg shrink-0">
                  <ChartColumn size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1">
                    Báo cáo & thống kê
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Tổng hợp số liệu, báo cáo doanh thu, hiệu suất hoạt động.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Đăng nhập vào HotelAdmin
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Vui lòng đăng nhập để truy cập hệ thống quản trị.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 text-sm mt-2"
            >
              <LogIn size={18} />
              <span>Đăng nhập ngay ?</span>
            </button>
          </form>

          {/* Đường phân cách "Hoặc" */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-medium">
                Hoặc
              </span>
            </div>
          </div>

          {/* Hỗ trợ liên hệ quản trị viên */}
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-center">
            <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
              <Info size={14} className="text-blue-600" />
              <span>Chưa có tài khoản?</span>
              <a
                href="mailto:admin@hotel.com"
                className="text-blue-600 hover:underline font-semibold"
              >
                Liên hệ quản trị viên
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
