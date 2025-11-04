// pages/RefRedirect.jsx
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const RefRedirect = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const referral = searchParams.get("ref");

  useEffect(() => {
    if (!referral) {
      navigate("/"); // No referral → Go to landing
      return;
    }

    // Try opening app via deep link
    const appLink = `myapp://referral?code=${referral}`;
    window.location.href = appLink;

    // ⏱️ If app not installed, redirect to App Instruction after 2 sec
    const timer = setTimeout(() => {
      navigate(`/app-instruction?ref=${referral}`);
    }, 2000);

    return () => clearTimeout(timer);
  }, [referral, navigate]);

  return (
    <div className="flex justify-center items-center h-screen text-lg">
      Checking your app installation...
    </div>
  );
};

export default RefRedirect;
