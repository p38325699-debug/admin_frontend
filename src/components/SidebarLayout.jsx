import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const SidebarLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ✅ default open

  return (
    <div className="flex bg-black min-h-screen text-white">
      {/* ✅ Sidebar toggle */}
      {isSidebarOpen && (
        <div className="fixed top-0 left-0 h-full w-60 bg-gray-900 z-40 transition-all duration-300">
          <Sidebar />
        </div>
      )}

      {/* ✅ Right side (main area) */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-60" : "ml-0"
        }`}
      >
        {/* ✅ Header with toggle button */}
        <div className="sticky top-0 z-30 bg-gray-950 shadow-md">
          <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>

        {/* ✅ Main content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
