import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "./components/layout/Sidebar";
import { RoomBookingPage } from "./pages/RoomBookingPage";
import { FoodOrderPage } from "./pages/FoodOrderPage";
import { AmenitiesPage } from "./pages/AmenitiesPage";
import { GuestsPage } from "./pages/GuestPage";
import { SettingsPage } from "./pages/SettingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { RevenuePage } from "./pages/RevenuePage";
import { WelcomePage } from "./pages/WelcomePage";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<string>("/dashboard");
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-600 font-medium"> Đang tải hệ thống...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <WelcomePage />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-6 overflow-y-auto">
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/room" element={<RoomBookingPage />} />
          <Route path="/food" element={<FoodOrderPage />} />
          <Route path="/amenities" element={<AmenitiesPage />} />
          <Route path="/revenue" element={<RevenuePage />} />
          <Route path="/guests" element={<GuestsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
