// src/components/Header.jsx
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-black rounded-lg ml-4 border border-gray-800 w-[calc(100vw-16rem)] shadow-2xl px-6 py-4 flex justify-between items-center backdrop-blur-sm bg-opacity-95">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent ml-0">
        Admin Panel
      </h1>

      <div className="flex items-center gap-6 mr-6">
        {/* Notification Icon with Badge */}
       

        {/* Profile with Gradient */}
        <div className="group cursor-pointer">
          <div className="p-[3px] rounded-full bg-gradient-to-br from-violet-500 to-purple-600 group-hover:from-violet-400 group-hover:to-purple-500 transition-all duration-300 group-hover:scale-105">
            <img
              src="/assets/male.jpg"
              alt="Profile"
              className="w-10.5 h-10.5 rounded-full bg-gray-800 border-1 border-gray-900 transition-all duration-300 group-hover:border-gray-800"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;