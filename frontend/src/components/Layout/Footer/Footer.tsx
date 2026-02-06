import React from 'react'
import { assets } from '../../../assets/assets'
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#222] text-white py-10 px-5">
      {/* Top */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Brand */}
        <div className="flex flex-col items-start">
          <h2 className="text-xl font-semibold text-[#ffcc00] mb-2">Nha Trang Hotel</h2>
          <img src={assets.logo3} alt="Logo" className="w-[250px] h-[150px] object-contain" />
        </div>

        {/* Contact */}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-[#ffcc00] mb-2">Thông tin liên hệ</h2>
          <p className="text-sm leading-relaxed">Address: 123 Nha Trang Street, Nha Trang City, Vietnam</p>
          <p className="text-sm">Phone: +84 123 456 789</p>
          <p className="text-sm">Email: NhaTrangHotels@gmail.com</p>
        </div>

        {/* About */}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-[#ffcc00] mb-2">Về chúng tôi</h2>
          <p className="text-sm leading-relaxed">
            Chuyên cung cấp dịch vụ đặt khách sạn và đồ ăn uy tín. Nhanh chóng – tiện lợi – an toàn. Hỗ trợ khách hàng
            24/7.
          </p>
        </div>

        {/* Social */}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-[#ffcc00] mb-2">Theo dõi chúng tôi</h2>
          <p className="text-sm leading-relaxed mb-3">
            Theo dõi chúng tôi trên mạng xã hội để cập nhật khuyến mãi mới nhất.
          </p>

          <div className="flex gap-4">
            <FaFacebook className="text-3xl cursor-pointer hover:scale-110 hover:text-[#ffcc00] transition" />
            <FaInstagram className="text-3xl cursor-pointer hover:scale-110 hover:text-[#ffcc00] transition" />
            <FaTiktok className="text-3xl cursor-pointer hover:scale-110 hover:text-[#ffcc00] transition" />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#444] mt-10 pt-6 text-center text-xs text-[#aaa]">
        © 2025 Ha Duc Anh. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
