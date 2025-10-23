import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGooglePlay, FaArrowLeft } from "react-icons/fa";

const AppInstruction = () => {
  const navigate = useNavigate();

  // Scroll to top when entering the page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="min-h-screen text-gray-200 py-12 px-6 md:px-16 lg:px-20">
      {/* Back Button */}
    {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)} // Go back to previous page
              className="flex cursor-pointer items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
            >
              <FaArrowLeft />
              <span>Back</span>
            </button>
          </div>

      <h1 className="text-3xl font-bold text-violet-400 mb-6">
        App Instructions
      </h1>

      <p className="mb-4">
        Welcome to <strong>Knowo</strong>! Follow these simple steps to start
        using our app and earning rewards easily.
      </p>

      <ol className="list-decimal list-inside space-y-3 mb-8">
        <li>Download the app from the Google Play Store.</li>
        <li>Create an account using your email or phone number.</li>
        <li>Verify your account via OTP sent to your email or mobile.</li>
        <li>Explore quizzes and videos in your dashboard.</li>
        <li>Earn points for completing quizzes or watching videos.</li>
        <li>Redeem your rewards in the "Wallet" section of the app.</li>
      </ol>

      <div className="text-center">
        <a
          href="https://play.google.com/store/apps/details?id=com.quiz.com123"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 transform hover:scale-105 mb-8"
        >
          <FaGooglePlay className="text-2xl" />
          <span className="text-lg">Get it on Google Play</span>
        </a>
      </div>

      <p className="text-gray-400 text-sm text-center">
        Need help? Contact{" "}
        <a
          href="mailto:support@knowo.world"
          className="text-violet-400 hover:underline"
        >
          support@knowo.world
        </a>
      </p>
    </div>
  );
};

export default AppInstruction;
