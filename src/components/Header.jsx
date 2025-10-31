import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Header = ({ onToggleSidebar }) => {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 w-full shadow-2xl px-6 py-4 flex justify-between items-center backdrop-blur-sm bg-opacity-95">
      <div className="flex items-center gap-4">
        {/* ✅ Menu Toggle Button */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-800 transition"
        >
          <MenuIcon />
        </button>

        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Admin Panel
        </h1>
      </div>

      <div className="flex items-center gap-6 mr-6">
        <div className="group cursor-pointer">
          <div className="p-[3px] rounded-full bg-gradient-to-br from-violet-500 to-purple-600 transition-all duration-300 group-hover:scale-105">
            <img
              src="/assets/male.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full bg-gray-800 border border-gray-900"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
