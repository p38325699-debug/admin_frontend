// src/components/Header.jsx
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Header = () => {
  return (
    <header className="bg-[#292828] rounded-lg mx-61.5  border-b-1 border-gray-700 w-[80.5vw] shadow px-0 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white ml-4">Admin Panel</h1>

      <div className="flex items-center gap-6 mr-6">
        {/* Notification Icon with Badge */}
        <div className="relative cursor-pointer">
          <NotificationsIcon className="text-white text-4xl" />
          <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[12px] font-bold px-[5px] py-0 rounded-full">
            3
          </span>
        </div>

        {/* Welcome + Profile */}
        {/* <p className="text-white font-medium">Welcome, Admin</p> */}
        <div className="p-[4px] rounded-full bg-gradient-to-br from-[#c20af5] to-[#670383]">
          <img
            src="/assets/profile.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full bg-white"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
