# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

// Cấu trúc chính của FrontEnd

frontend/
├── public/ # Chứa favicon, index.html
├── src/
│ ├── api/ # Tất cả gọi API backend
│ │ ├── bookingApi.js
│ │ ├── roomApi.js
│ │ ├── foodApi.js
│ │ └── userApi.js
│ │
│ ├── assets/ # Ảnh, icon, static files
│ │ ├── images/
│ │ └── icons/
│ │
│ ├── components/ # Component chia theo tính năng (Feature-Based)
│ │ ├── Booking/
│ │ │ ├── BookingModal.jsx
│ │ │ ├── BookingModal.css
│ │ │ └── bookingUtils.js
│ │ │
│ │ ├── HotelsDisplay/
│ │ │ ├── HotelsDisplay.jsx
│ │ │ ├── HotelCard.jsx
│ │ │ ├── Stars.jsx
│ │ │ └── HotelsDisplay.css
│ │ │
│ │ ├── FoodsOrder/
│ │ │ ├── FoodCard.jsx
│ │ │ └── FoodsOrder.jsx
│ │ │
│ │ ├── FloatingCart/
│ │ │ └── FloatingCart.jsx
│ │ │
│ │ └── Common/
│ │ ├── Navbar.jsx
│ │ ├── Footer.jsx
│ │ └── ProtectedRoute.jsx
│ │
│ ├── context/ # Global Context Provider
│ │ ├── RoomContext.jsx
│ │ ├── FoodContext.jsx
│ │ ├── BookingContext.jsx
│ │ └── UserContext.jsx # nếu cần mở rộng ngoài Auth0
│ │
│ ├── hooks/ # Custom hooks (tuỳ chọn)
│ │ ├── useBooking.js
│ │ └── useCart.js
│ │
│ ├── pages/ # Page lớn tương ứng với route chính
│ │ ├── Home.jsx
│ │ ├── Rooms.jsx
│ │ ├── Foods.jsx
│ │ ├── Checkout.jsx
│ │ └── NotFound.jsx
│ │
│ ├── styles/ # Global styles hoặc variables CSS
│ │ └── variables.css
│ │
│ ├── App.jsx # App layout + định tuyến
│ ├── main.jsx # entry point
│ └── routes.js # Định nghĩa route chính
│
├── .env
├── .gitignore
├── package.json
└── vite.config.js # hoặc CRA: vite => react-scripts

     ##========================================================##

// Cấu trúc BackEnd

backend/
├── config/
│ └── db.js # kết nối MongoDB
├── controllers/
│ ├── roomController.js
│ ├── foodController.js
│ ├── bookingController.js
│ ├── userController.js
│ └── index.js # export tất cả controller
├── models/
│ ├── roomModel.js
│ ├── foodModel.js
│ ├── bookingModel.js
│ └── userModel.js
├── routes/
│ ├── roomRoutes.js
│ ├── foodRoutes.js
│ ├── bookingRoutes.js
│ └── userRoutes.js
├── middlewares/
│ ├── checkJwt.js
│ ├── hasBookedRoom.js
│ └── auth.js
├── services/ # xử lý logic ngoài controller (tùy chọn)
│ └── bookingService.js
├── upload/
│ ├── rooms/
│ └── foods/
├── app.js # khởi tạo express + middleware
└── server.js # chạy app.listen
