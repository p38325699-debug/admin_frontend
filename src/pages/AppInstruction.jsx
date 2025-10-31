import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaDownload,
  FaUserPlus,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";

const AppInstruction = () => {
  const navigate = useNavigate();

  // Scroll to top when entering the page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Auto-download handler
  const handleDownload = () => {
    const apkUrl =
      "https://expo.dev/artifacts/eas/fnCEdsCN2Ci2xotwooLyNg.apk";
      
    const link = document.createElement("a");
    link.href = apkUrl;
    link.download = "KnowoApp.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen text-gray-200 py-2 px-6 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex cursor-pointer items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors mr-4"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-violet-400 mb-4">
            Knowo App Installation & Onboarding
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Follow these simple steps to install the Knowo app and start your
            learning journey.
          </p>
        </div>

        {/* Step 1: Install the App */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-violet-500/30 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-violet-500/20 p-3 rounded-full">
              <FaDownload className="text-violet-400 text-2xl" />
            </div>
            <h2 className="text-2xl font-semibold text-violet-300">
              Step 1: Download & Install the App
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <div className="flex items-start gap-3">
              <div className="bg-violet-500/20 rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-violet-400 text-sm font-bold">1</span>
              </div>
              <p>Click the <strong>“Download App”</strong> button below.</p>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-violet-500/20 rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-violet-400 text-sm font-bold">2</span>
              </div>
              <p>The APK file will start downloading automatically.</p>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-violet-500/20 rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-violet-400 text-sm font-bold">3</span>
              </div>
              <p>
                Once the download is complete, tap the APK file to install it on
                your Android phone. (You may need to allow “Install from unknown
                sources”)
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-violet-500/20 rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-violet-400 text-sm font-bold">4</span>
              </div>
              <p>After installation, tap “Open” to launch the app.</p>
            </div>
          </div>
        </div>

        {/* Step 2: Sign Up */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-violet-500/30 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-violet-500/20 p-3 rounded-full">
              <FaUserPlus className="text-violet-400 text-2xl" />
            </div>
            <h2 className="text-2xl font-semibold text-violet-300">Step 2: Sign Up</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <div className="flex items-start gap-3">
              <div className="bg-violet-500/20 rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-violet-400 text-sm font-bold">1</span>
              </div>
              <p>On the app, tap <strong>Sign Up</strong>.</p>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-violet-500/20 rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-violet-400 text-sm font-bold">2</span>
              </div>
              <p>Fill in the required details like Name, Email, Password, and more.</p>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-violet-500/20 rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-violet-400 text-sm font-bold">3</span>
              </div>
              <p>Tap <strong>Submit</strong> or <strong>Next</strong>.</p>
            </div>
          </div>
        </div>

        {/* Step 3: Email Verification */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-violet-500/30 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-violet-500/20 p-3 rounded-full">
              <FaEnvelope className="text-violet-400 text-2xl" />
            </div>
            <h2 className="text-2xl font-semibold text-violet-300">Step 3: Email Verification</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              You’ll receive a verification code (OTP) on your registered email.
              Enter it in the app to verify and continue.
            </p>
          </div>
        </div>

        {/* Step 4: Account Activation */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-violet-500/30 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-violet-500/20 p-3 rounded-full">
              <FaCheckCircle className="text-violet-400 text-2xl" />
            </div>
            <h2 className="text-2xl font-semibold text-violet-300">
              Step 4: Account Activation
            </h2>
          </div>

          <div className="text-gray-300 space-y-3">
            <p>Our team will manually activate your account after verification.</p>
            <p>Once activated, you can start using the app fully.</p>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-amber-300 mb-6 text-center">
            Tips for Users
          </h2>
          <ul className="space-y-3 text-amber-200 list-disc list-inside">
            <li>Ensure a stable internet connection during signup.</li>
            <li>Enable “Install from unknown sources” when prompted.</li>
            <li>
              For issues, contact{" "}
              <a
                href="mailto:support@knowo.world"
                className="text-amber-300 underline font-semibold"
              >
                support@knowo.world
              </a>
            </li>
          </ul>
        </div>

        {/* Download Button */}
        <div className="text-center">
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 transform hover:scale-105 mb-8"
          >
            <FaDownload className="text-2xl" />
            <span className="text-lg">Download App (APK)</span>
          </button>
        </div>

        {/* Support Info */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Need help? Contact{" "}
            <a
              href="mailto:support@knowo.world"
              className="text-violet-400 hover:underline font-semibold"
            >
              support@knowo.world
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppInstruction;
