import React from "react";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/layout/Sidebar";
import { RoomBookingPage } from "./pages/RoomBookingPage";
import { FoodOrderPage } from "./pages/FoodOrderPage";
import { AmenitiesPage } from "./pages/AmenitiesPage";
import { GuestsPage } from "./pages/GuestPage";
import { SettingsPage } from "./pages/SettingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { RevenuePage } from "./pages/RevenuePage";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<string>("/");

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="p-2">
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/room" element={<RoomBookingPage />} />
          <Route path="/food" element={<FoodOrderPage />} />
          <Route path="/amenities" element={<AmenitiesPage />} />
          <Route path="/revenue" element={<RevenuePage />} />
          <Route path="/guests" element={<GuestsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
