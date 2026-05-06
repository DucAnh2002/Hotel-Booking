import React from 'react'
import { assets } from '../../../assets/assets'
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#222] text-white pt-10 pb-6 px-4 sm:px-6">
      {/* Top */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-[#ffcc00] mb-3">Nha Trang Hotel</h2>
          <img src={assets.logo3} alt="Logo" className="w-[160px] sm:w-[220px]  object-contain mb-3" />
          <p>Đặt phòng nhanh chóng - tiện lợi - an toàn.</p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-[#ffcc00] mb-3">Thông tin liên hệ</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Address: 123 Nha Trang Street, Nha Trang City, Vietnam
          </p>
          <p className="text-sm text-gray-400 mt-1">Phone: +84 123 456 789</p>
          <p className="text-sm text-gray-400 mt-1">Email: NhaTrangHotels@gmail.com</p>
        </div>

        {/* About */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-[#ffcc00] mb-3">Về chúng tôi</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Chuyên cung cấp dịch vụ đặt khách sạn và đồ ăn uy tín. Nhanh chóng – tiện lợi – an toàn. Hỗ trợ khách hàng
            24/7.
          </p>
        </div>

        {/* Social */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-[#ffcc00] mb-3">Theo dõi</h2>
          <p className="text-sm text-gray-400 mb-4">
            Theo dõi chúng tôi trên mạng xã hội để cập nhật khuyến mãi mới nhất.
          </p>

          <div className="flex gap-4">
            <FaFacebook className="text-2xl cursor-pointer hover:scale-110 hover:text-[#ffcc00] transition" />
            <FaInstagram className="text-3xl cursor-pointer hover:scale-110 hover:text-[#ffcc00] transition" />
            <FaTiktok className="text-3xl cursor-pointer hover:scale-110 hover:text-[#ffcc00] transition" />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#444] mt-8 pt-4 text-center text-xs text-gray-500">
        © 2025 Ha Duc Anh. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
