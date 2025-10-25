import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGooglePlay, FaArrowLeft, FaDownload, FaUserPlus, FaEnvelope, FaCheckCircle } from "react-icons/fa";

const AppInstruction = () => {
  const navigate = useNavigate();

  // Scroll to top when entering the page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen  text-gray-200 py-2 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
       <div className="flex items-center mb-8">
                 <button
                   onClick={() => navigate('/')}
                   className="flex cursor-pointer items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors mr-4"
                 >
                   <FaArrowLeft />
                   <span>Back</span>
                 </button>
               </div>

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-violet-400 mb-4">
            Knowo App Installation & Onboarding
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Follow these simple steps to install the Knowo app and start your learning journey
          </p>
        </div>

        {/* Step 1: Install the App */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-violet-500/30 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-violet-500/20 p-3 rounded-full">
              <FaDownload className="text-violet-400 text-2xl" />
            </div>
            <h2 className="text-2xl font-semibold text-violet-300">Step 1: Install the App</h2>
          </div>
          
          <div className="space-y-4 text-gray-300">
            <div className="flex items-start gap-3">
              <div className="bg-violet-500/20 rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-violet-400 text-sm font-bold">1</span>
              </div>
              <p>Click the "Download on Play Store" button on this page.</p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-violet-500/20 rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-violet-400 text-sm font-bold">2</span>
              </div>
              <p>You will be redirected to the Google Play Store.</p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-violet-500/20 rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-violet-400 text-sm font-bold">3</span>
              </div>
              <p>Tap "Install" to download the app.</p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-violet-500/20 rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-violet-400 text-sm font-bold">4</span>
              </div>
              <p>Once installed, tap "Open" to launch the app.</p>
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
              <p>Fill in the required details:</p>
            </div>
            
            <div className="ml-9 grid md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                <span>Full Name</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                <span>Email</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                <span>Password</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                <span>Date of Birth</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                <span>Country</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                <span>Phone Number</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                <span>Gender</span>
              </div>
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
            <div className="flex items-start gap-3">
              <div className="bg-violet-500/20 rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-violet-400 text-sm font-bold">1</span>
              </div>
              <p>An OTP (One-Time Password) will be sent to your registered email.</p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-violet-500/20 rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-violet-400 text-sm font-bold">2</span>
              </div>
              <p>Enter the OTP in the app to verify your email.</p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-violet-500/20 rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-violet-400 text-sm font-bold">3</span>
              </div>
              <p>After verification, you will be logged in safely to your application dashboard.</p>
            </div>
          </div>
        </div>

        {/* Step 4: Account Activation */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-violet-500/30 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-violet-500/20 p-3 rounded-full">
              <FaCheckCircle className="text-violet-400 text-2xl" />
            </div>
            <h2 className="text-2xl font-semibold text-violet-300">Step 4: Account Activation</h2>
          </div>
          
          <div className="space-y-4 text-gray-300">
            <div className="flex items-start gap-3">
              <div className="bg-violet-500/20 rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-violet-400 text-sm font-bold">1</span>
              </div>
              <p>Our technical team will manually connect your account.</p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-violet-500/20 rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-violet-400 text-sm font-bold">2</span>
              </div>
              <p>Once connected, the app will be fully ready for use.</p>
            </div>
          </div>
        </div>

        {/* Tips for Users */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-amber-300 mb-6 text-center">Tips for Users</h2>
          
          <div className="space-y-4 text-amber-200">
            <div className="flex items-start gap-3">
              <div className="bg-amber-500/20 rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-amber-400 text-sm">💡</span>
              </div>
              <p>Make sure your internet connection is stable during signup and OTP verification.</p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-amber-500/20 rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-amber-400 text-sm">💡</span>
              </div>
              <p>Enter accurate details for smooth activation.</p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-amber-500/20 rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-amber-400 text-sm">💡</span>
              </div>
              <p>
                If you face any issues, contact our support team at{" "}
                <a 
                  href="mailto:support@knowo.world" 
                  className="text-amber-300 hover:underline font-semibold"
                >
                  support@knowo.world
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="text-center">
          <a
            href="https://play.google.com/store/apps/details?id=com.quiz.com123"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 transform hover:scale-105 mb-8"
          >
            <FaGooglePlay className="text-2xl" />
            <span className="text-lg">Download on Play Store</span>
          </a>
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