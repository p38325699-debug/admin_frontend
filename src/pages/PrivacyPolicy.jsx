import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft} from 'react-icons/fa';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 py-12 px-6 md:px-16 lg:px-32">
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

      <h1 className="text-3xl font-bold text-violet-400 mb-6">
        Privacy Policy
      </h1>
      <p className="mb-4">
        At <strong>Knowo</strong>, your privacy is our top priority. This
        Privacy Policy explains how we collect, use, and protect your
        information when you use our mobile app and website.
      </p>

      <h2 className="text-xl font-semibold text-violet-300 mt-6 mb-2">
        1. Information We Collect
      </h2>
      <p className="mb-4">
        We may collect personal information such as your name, email, phone
        number, and usage data when you register or use our services.
      </p>

      <h2 className="text-xl font-semibold text-violet-300 mt-6 mb-2">
        2. How We Use Your Information
      </h2>
      <p className="mb-4">
        Your data is used to improve our services, process payments, enhance
        user experience, and communicate with you about updates or offers.
      </p>

      <h2 className="text-xl font-semibold text-violet-300 mt-6 mb-2">
        3. Data Protection
      </h2>
      <p className="mb-4">
        We implement industry-standard security measures to safeguard your data.
        However, please note that no online platform is 100% secure.
      </p>

      <h2 className="text-xl font-semibold text-violet-300 mt-6 mb-2">
        4. Sharing of Information
      </h2>
      <p className="mb-4">
        We do not sell or rent your data. Your information may be shared only
        with trusted third-party partners to deliver our services effectively.
      </p>

      <h2 className="text-xl font-semibold text-violet-300 mt-6 mb-2">
        5. Your Rights
      </h2>
      <p className="mb-4">
        You can request access to, correction of, or deletion of your personal
        data by contacting our support team at{" "}
        <a
          href="mailto:support@knowo.world"
          className="text-violet-400 hover:underline"
        >
          support@knowo.world
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold text-violet-300 mt-6 mb-2">
        6. Updates to This Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy occasionally. Any changes will be
        posted on this page with the updated effective date.
      </p>

      <p className="mt-6 text-gray-400 text-sm">
        Effective Date: October 2025
      </p>
    </div>
  );
};

export default PrivacyPolicy;
