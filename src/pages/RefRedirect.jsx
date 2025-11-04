import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const RefRedirect = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const refCode = params.get("ref");
    if (!refCode) {
      navigate("/"); // no referral, back to home
      return;
    }

    console.log("🎯 Referral code detected:", refCode);

    // Build your deep link (same as Expo scheme)
    const deepLink = `knowo://referral?ref=${refCode}`;
    const startTime = Date.now();

    // Try opening the app via hidden iframe
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = deepLink;
    document.body.appendChild(iframe);

    // Wait 1.2 seconds — if app doesn't open, redirect to AppInstruction
    setTimeout(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed < 1500) {
        console.log("App not installed — redirecting to AppInstruction");
        navigate(`/app-instruction?ref=${refCode}`);
      }
    }, 1200);
  }, [params, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-2xl mb-4">Opening Knowo App...</h1>
      <p className="text-gray-400">Please wait or install the app if not installed.</p>
    </div>
  );
};

export default RefRedirect;
