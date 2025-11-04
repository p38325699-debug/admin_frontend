import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import UserTable from "./pages/UserTable";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import HomeData from "./pages/HomeData";
import TaskData from "./pages/TaskData";
import QuizForm from "./pages/quiz_form";
import QuizTable from "./pages/quiz_table";
import PaymentPage from "./pages/PaymentPage";
import NotificationsPage from "./pages/NotificationsPage";
import UPIScanner from "./pages/UPIScanner";
import WithdrawalPage from "./pages/WithdrawalPage";
import LandingPage from "./pages/LandingPage";
import CryptoPay from "./pages/CryptoPay";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import AppInstruction from "./pages/AppInstruction";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import GoldMembers from "./pages/GoldMembers";
import PlanPurchases from "./pages/PlanPurchases";
import ContactMsg from "./pages/ContactMsg";
import RefRedirect from "./pages/RefRedirect";

const AppLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ✅ toggle state

  const hiddenRoutes = [
    "/",
    "/admin",
    "/privacy-policy",
    "/terms-and-conditions",
    "/contact",
    "/refund-policy",
    "/about-us",
    "/app-instruction",
  ];

  const hideLayout = hiddenRoutes.includes(location.pathname);

  return (
    <div className="flex bg-black min-h-screen text-white">
      {/* ✅ Sidebar toggle logic */}
      {!hideLayout && isSidebarOpen && (
        <div className="fixed top-0 left-0 h-full w-60 bg-gray-900 z-40 transition-all duration-300">
          <Sidebar />
        </div>
      )}

      {/* ✅ Right content area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          !hideLayout && isSidebarOpen ? "ml-60" : "ml-0"
        }`}
      >
        {/* ✅ Header with toggle button */}
        {!hideLayout && (
          <div className="sticky top-0 z-30 bg-gray-950 shadow-md">
            <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          </div>
        )}

        {/* ✅ Page content */}
        <main className="flex-1 p-6">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<Login />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path="/contact" element={<Contact />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-table" element={<UserTable />} />
            <Route path="/home-data" element={<HomeData />} />
            <Route path="/task-data" element={<TaskData />} />
            <Route path="/quiz_form" element={<QuizForm />} />
            <Route path="/quiz_table" element={<QuizTable />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/refund-policy" element={<RefundPolicyPage />} />
            <Route path="/withdrawal" element={<WithdrawalPage />} />
            <Route path="/upi-scanner" element={<UPIScanner />} />
            <Route path="/crypto-pay" element={<CryptoPay />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/app-instruction" element={<AppInstruction />} />
            <Route path="/gold-members" element={<GoldMembers />} />
            <Route path="/plan-purchases" element={<PlanPurchases />} />
            <Route path="/contact-msg" element={<ContactMsg />} />
            <Route path="/ref-redirect" element={<RefRedirect/>} />


            {/* Default fallback */}
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default App;
