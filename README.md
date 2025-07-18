# 🏨 Hotel Booking App (MERN Stack)

A full-stack hotel booking application built with **React + Vite + Node.js + MongoDB**, with modular architecture for scalability and maintainability.

---

## 🛠 Technologies

- Frontend: `React`, `Vite`, `Context API`, `CSS Modules`
- Backend: `Express.js`, `MongoDB`, `Mongoose`
- Auth: `Auth0`, `JWT`
- Others: `axios`, `react-toastify`, `react-confirm-alert`, `multer`

---

## 📁 Frontend Structure

```
frontend/
├── public/                  # Static files (favicon, index.html)
├── src/
│   ├── assets/             # Images, icons
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/         # Feature-based components
│   │   ├── Booking/
│   │   │   ├── BookingModal.jsx
│   │   │   ├── BookingModal.css
│   │   │   └── bookingUtils.js
│   │   ├── HotelsDisplay/
│   │   │   ├── HotelsDisplay.jsx
│   │   │   ├── HotelCard.jsx
│   │   │   ├── Stars.jsx
│   │   │   └── HotelsDisplay.css
│   │   ├── FoodsOrder/
│   │   │   ├── FoodCard.jsx
│   │   │   └── FoodsOrder.jsx
│   │   ├── FloatingCart/
│   │   │   └── FloatingCart.jsx
│   │   └── Common/
│   │       ├── Navbar.jsx
│   │       ├── Footer.jsx
│   │       └── ProtectedRoute.jsx
│   │
│   ├── context/            # Global Context Providers
│   │   ├── RoomContext.jsx
│   │   ├── FoodContext.jsx
│   │   ├── BookingContext.jsx
│   │   └── UserContext.jsx
│   │
│   │
│   ├── pages/              # Route-level pages
│   │   ├── Home.jsx
│   │   ├── Rooms.jsx
│   │   ├── Foods.jsx
│   │   └── NotFound.jsx
│   │
│   ├── styles/             # Global styles and variables
│   │   └── variables.css
│   │
│   ├── App.jsx             # Root component with layout and routes
│   ├── main.jsx            # Entry point
│
├── .env
├── .gitignore
├── package.json
└── vite.config.js          # Or react-scripts if using CRA
```

---

## 📦 Backend Structure

```
backend/
├── config/
│   └── db.js                       # MongoDB connection
│
├── controllers/                   # Route handlers
│   ├── roomController.js
│   ├── foodController.js
│   ├── bookingController.js
│   ├── userController.js
│   └── index.js                   # Optional: export all controllers
│
├── models/                        # Mongoose models
│   ├── roomModel.js
│   ├── foodModel.js
│   ├── bookingModel.js
│   └── userModel.js
│
├── routes/                        # API routes
│   ├── roomRoutes.js
│   ├── foodRoutes.js
│   ├── bookingRoutes.js
│   └── userRoutes.js
│
├── middlewares/
│   ├── checkJwt.js
│   ├── hasBookedRoom.js
│   └── auth.js
│
├── services/                      # (Optional) Business logic layer
│   └── bookingService.js
│
├── upload/                        # Uploaded files
│   ├── rooms/
│   └── foods/
│
├── app.js                         # Express app setup and middleware
└── server.js                      # Entry point to run the server
```

---

admin/
├── src/
│ ├── components/
│ │ ├── Navbar/
│ │ └── Sidebar/
│ ├── pages/
│ │ ├── Add/ # Thêm món/phòng
│ │ ├── List/ # Xem danh sách món/phòng
│ │ └── OrdersAndBooking/ # Quản lý đơn đặt
│ ├── App.jsx
│ └── main.jsx
├── .env
└── vite.config.js

---

## 📌 Notes

- This project follows a **modular and scalable folder structure** for both frontend and backend.
- Easily extensible to integrate more services or migrate to advanced frameworks like `NestJS`.
  📈 Roadmap

The goal is to build a full-featured hotel booking system with modern architecture. Below is the development roadmap:

### ✅ Completed

- Room listing and detail pages
- Food ordering with floating cart
- Auth0 authentication (login/logout)
- Route protection for users who haven't booked a room

### 🛠 In Progress

- Booking history page for users
- Admin dashboard: add/list food & rooms
- UI improvements for booking modal

### 🔜 Planned Features

- Payment gateway integration (e.g., Stripe)
- Email confirmation after booking
- User profile management (edit info, view history)
- Filter/sort for rooms and food
- Mobile responsiveness (improve mobile UX)
- SEO optimization and performance improvements

### 🤝 Open for Contributions

We welcome feedback and contributions!
