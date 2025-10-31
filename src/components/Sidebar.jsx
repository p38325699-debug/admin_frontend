import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PaymentIcon from "@mui/icons-material/Payment";
import LogoutIcon from "@mui/icons-material/Logout";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin"; 
import ContactMailIcon from "@mui/icons-material/ContactMail";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { path: "/user-table", label: "User Manage", icon: <PeopleIcon /> },
    { path: "/home-data", label: "Home Manage", icon: <HomeIcon /> },
    { path: "/task-data", label: "Task Manage", icon: <AssignmentIcon /> },
    { path: "/payment", label: "Payment", icon: <PaymentIcon /> },
    { path: "/crypto-pay", label: "Crypto Pay", icon: <CurrencyBitcoinIcon /> }, // 🟢 New Menu Item
    { path: "/upi-scanner", label: "UPI Scanner", icon: <CloudUploadIcon /> },
    { path: "/notifications", label: "Notifications", icon: <NotificationsIcon /> },
    { path: "/withdrawal", label: "Withdrawal", icon: <AccountBalanceWalletIcon /> },
    { path: "/gold-members", label: "Gold Members", icon: <PeopleIcon /> },
    { path: "/plan-purchases", label: "Plan Purchases", icon: <AssignmentIcon /> },
     { path: "/contact-msg", label: "Contact Msg", icon: <ContactMailIcon /> },


  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-gray-900 to-black shadow-2xl flex flex-col border-r border-gray-800 backdrop-blur-lg bg-opacity-95">
      {/* Header / Logo */}
      <div className="h-24 flex items-center justify-center border-b border-gray-800 bg-gradient-to-r from-gray-900 to-black">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
            Knowo
          </h2>
          <p className="text-xs text-gray-400 mt-1 font-light">Admin Panel</p>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 px-4 py-6 overflow-y-auto">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.path} className="relative group">
              {isActive(item.path) && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-10 bg-gradient-to-b from-violet-500 to-purple-600 rounded-r-full shadow-lg shadow-violet-500/50" />
              )}
              <Link
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 transform relative overflow-hidden
                  ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-violet-500/20 to-purple-500/10 text-white shadow-lg shadow-violet-500/20 scale-[1.02] border border-violet-500/30"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50 hover:scale-[1.02] hover:shadow-lg border border-transparent"
                  }`}
              >
                {isActive(item.path) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/5 blur-sm" />
                )}
                <span
                  className={`relative z-10 text-xl transition-all duration-300 ${
                    isActive(item.path)
                      ? "text-violet-400 drop-shadow-lg"
                      : "text-gray-400 group-hover:text-violet-300"
                  }`}
                >
                  {item.icon}
                </span>
                <span
                  className={`relative z-10 font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? "text-white text-shadow"
                      : "group-hover:text-white"
                  }`}
                >
                  {item.label}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="border-t border-gray-800 px-4 py-6 bg-gradient-to-t from-gray-900 to-transparent">
        <div className="relative group">
          <Link
            to="/login"
            className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-400 hover:text-white transition-all duration-300 group hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-600/5 hover:border hover:border-red-500/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <LogoutIcon className="text-xl relative z-10 group-hover:text-red-400 transition-colors duration-300" />
            <span className="text-[15px] font-medium relative z-10 group-hover:text-red-100 transition-colors duration-300">
              Logout
            </span>
          </Link>
        </div>
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 font-light">v2.1.0</p>
        </div>
      </div>

      <div className="absolute top-1/4 -right-1 w-2 h-16 bg-gradient-to-b from-violet-500 to-purple-600 rounded-l-full opacity-20 blur-sm" />
      <div className="absolute bottom-1/3 -right-1 w-1 h-8 bg-violet-400 rounded-l-full opacity-30 blur-sm" />
    </aside>
  );
};

export default Sidebar;
