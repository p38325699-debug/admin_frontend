import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { path: "/user-table", label: "User Manage", icon: <PeopleIcon /> },
    { path: "/home-data", label: "Home Manage", icon: <HomeIcon /> },
    { path: "/task-data", label: "Task Manage", icon: <AssignmentIcon /> },
  ];

  return (
    // <aside className="fixed top-0 left-0 h-screen w-60 bg-[#1e1e1e] shadow-lg flex flex-col border-r border-white">
    <aside className="fixed top-0 left-0 h-screen w-60 bg-[#1e1e1e] shadow-lg flex flex-col border-r-4 border-white">
      {/* Header / Logo */}
      <div className="h-20 flex items-center justify-center border-b border-gray-700">
        <h2 className="text-2xl font-bold text-white">QuizApp</h2>
      </div>

      {/* Menu */}
      <ul className="flex-1 mt-6 space-y-2 px-4">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 transform
                ${
                  isActive(item.path)
                    ? "bg-violet-500/20 text-violet-400 scale-105"
                    : "text-gray-400 hover:bg-gray-500/20 hover:text-white scale-100"
                }`}
            >
              <span
                className={`text-xl ${
                  isActive(item.path)
                    ? "text-violet-400"
                    : "text-gray-400 group-hover:text-white"
                }`}
              >
                {item.icon}
              </span>
              <span
                className={`font-semibold transition-colors duration-200 ${
                  isActive(item.path) ? "text-lg text-violet-400" : "text-base"
                }`}
              >
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Footer / Logout */}
      <div className="border-t border-gray-700 px-4 py-4">
        <Link
          to="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#2c2c2c] hover:text-white transition-all"
        >
          <LogoutIcon />
          <span className="text-[15px] font-medium">Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
