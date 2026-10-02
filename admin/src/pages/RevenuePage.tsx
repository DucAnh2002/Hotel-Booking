import react from "react";
import {
  CreditCard,
  DollarSign,
  Building2,
  Utensils,
  Sparkles,
  Banknote,
  Building,
  Globe,
} from "lucide-react";

export const RevenuePage: React.FC = () => {
  return (
    <>
      <div className="space-y-6 pl-64 min-h-screen p-8">
        {/* TIÊU ĐỀ  */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <CreditCard className="text-blue-600" />
            THANH TOÁN & DOANH THU
          </h1>
          <p className="text-sm text-slate-500">
            Theo dõi tổng quan dòng tiền và nguồn thu nhập
          </p>
        </div>

        {/* DOANH THU TỔNG HỢP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-blue-100 text-sm font-medium">
                Doanh thu hôm nay
              </span>
              <DollarSign size={24} />
            </div>
            <p className="text-3xl font-extrabold mt-3"> 12.500.000đ</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 text-sm font-medium">
                Doanh thu tháng
              </span>
              <DollarSign className="text-slate-400" size={24} />
            </div>
            <p className="text-3xl font-extrabold mt-3">285.600.000đ</p>
          </div>

          {/* NGUỒN DOANH THU */}
          <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-xl">
            <h2 className="font-bold text-slate-800 text-lg mb-4">
              Nguồn doanh thu
            </h2>
            <div className="space-y-4">
              {/* Đặt phòng */}
              <div>
                <div className="flex justify-between items-center text-sm font-medium text-slate-700 mb-1">
                  <span className="flex items-center gap-2">
                    <Building size={18} className="text-blue-500" /> Đặt phòng
                  </span>
                  <span className="font-bold text-slate-900"> 210M</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: "73%" }}
                  />
                </div>
              </div>

              {/* F&B */}
              <div>
                <div className="flex justify-between items-center text-sm font-medium text-slate-700 mb-1">
                  <span>
                    <Utensils size={18} className="text-amber-500" /> F&B
                  </span>
                  <span className="font-bold text-slate-900">48M</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div
                    className="bg-amber-500 h-3 rounded-full"
                    style={{ width: "17%" }}
                  />
                </div>
              </div>
            </div>

            {/* SPA & Services  */}
            <div>
              <div className="flex justify-between items-center text-sm font-medium text-slate-700 mb-1">
                <span className="flex items-center gap-2">
                  <Sparkles size={18} className="text-purple-500" /> Spa &
                  Service
                </span>
                <span className="font-bold text-slate-900"> 27M</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div
                  className="bg-purple-500 h-3 rounded-full"
                  style={{ width: "10%" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* PHƯƠNG THỨC THANH TOÁN */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="font-bold text-slate-800 text-lg mb-4">
            Phương thức thanh toán
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-lg">
                  <Banknote size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Tiền mặt</p>
                  <p className="text-sm font-bold text-slate-800">Cash</p>
                </div>
              </div>
              <span className="font-bold text-emerald-600 text-lg">80M</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-100 text-blue-700 rounded-lg">
                  <Building size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">
                    Ngân hàng
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    Bank Transfer
                  </p>
                </div>
              </div>
              <span className="font-bold text-blue-600 text-lg">120M</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-100 text-indigo-700 rounded-lg">
                  <Globe size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">
                    Thẻ quốc tế
                  </p>
                  <p className="text-sm font-bold text-slate-800">Stripe</p>
                </div>
              </div>
              <span className="font-bold text-indigo-600 text-lg">85M</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
