import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React from "react";

import LandingPage from "./pages/LandingPage";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import TermsConditions from "./pages/TermsConditions";
import AppInstruction from "./pages/AppInstruction";

const AppLayout = () => {
  const location = useLocation();

  // ✅ These routes don’t need header/sidebar etc.
  const hiddenRoutes = [
    "/",
    "/about-us",
    "/contact",
    "/contact-msg",
    "/privacy-policy",
    "/refund-policy",
    "/terms-and-conditions",
    "/app-instruction",
  ];

  const hideLayout = hiddenRoutes.includes(location.pathname);

  return (
    <div className="bg-black min-h-screen text-white">
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/contact-msg" element={<ContactMsg />} /> */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/app-instruction" element={<AppInstruction />} />
          {/* Fallback */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default App;
