// src/pages/LandingPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaGooglePlay,FaTelegram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBars, FaTimes } from "react-icons/fa";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

// Legal Pages Components
const PrivacyPolicyPage = () => (
  <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24 px-6 py-12">
    <div className="max-w-4xl mx-auto bg-gray-800/50 rounded-2xl p-8 border border-violet-500/30">
      <h1 className="text-4xl font-bold text-violet-400 mb-8 text-center">Privacy Policy</h1>
      
      <div className="text-gray-300 space-y-6 text-sm leading-relaxed">
        {/* COMPLIANCE DISCLAIMER ADDED */}
        <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-4 mb-6">
          <p className="text-violet-300 font-semibold text-center">
            Knowo does not provide any investment services, financial returns, or cryptocurrency trading opportunities. 
            All rewards are purely educational incentives and have no guaranteed monetary value.
          </p>
        </div>

        <p className="text-gray-400 italic">
          This privacy policy applies to the Knowo app (hereby referred to as "Application") for mobile devices that was created by Knowo Education Pvt. Ltd. (hereby referred to as "Service Provider") as an Ad Supported service. This service is intended for use "AS IS".
        </p>

        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Information Collection and Use</h3>
          <p className="mb-3">
            The Application collects information when you download and use it. This information may include information such as:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2 mb-3">
            <li>Your device's Internet Protocol address (e.g. IP address)</li>
            <li>The pages of the Application that you visit, the time and date of your visit, the time spent on those pages</li>
            <li>The time spent on the Application</li>
            <li>The operating system you use on your mobile device</li>
          </ul>
          <p className="mb-3">
            The Application does not gather precise information about the location of your mobile device.
          </p>
          <p className="mb-3">
            The Service Provider may use the information you provided to contact you from time to time to provide you with important information, required notices and marketing promotions.
          </p>
          <p>
            For a better experience, while using the Application, the Service Provider may require you to provide us with certain personally identifiable information, including but not limited to Email, Phone, Name. The information that the Service Provider request will be retained by them and used as described in this privacy policy.
          </p>
        </section>

        {/* Rest of privacy policy content remains the same */}
        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Third Party Access</h3>
          <p className="mb-3">
            Only aggregated, anonymized data is periodically transmitted to external services to aid the Service Provider in improving the Application and their service. The Service Provider may share your information with third parties in the ways that are described in this privacy statement.
          </p>
          <p className="mb-3">
            Please note that the Application utilizes third-party services that have their own Privacy Policy about handling data. Below are the links to the Privacy Policy of the third-party service providers used by the Application:
          </p>
          <ul className="list-disc list-inside ml-4 mb-3">
            <li>AdMob</li>
          </ul>
          <p>
            The Service Provider may disclose User Provided and Automatically Collected Information:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
            <li>as required by law, such as to comply with a subpoena, or similar legal process;</li>
            <li>when they believe in good faith that disclosure is necessary to protect their rights, protect your safety or the safety of others, investigate fraud, or respond to a government request;</li>
            <li>with their trusted services providers who work on their behalf, do not have an independent use of the information we disclose to them, and have agreed to adhere to the rules set forth in this privacy statement.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Opt-Out Rights</h3>
          <p>
            You can stop all collection of information by the Application easily by uninstalling it. You may use the standard uninstall processes as may be available as part of your mobile device or via the mobile application marketplace or network.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Data Retention Policy</h3>
          <p>
            The Service Provider will retain User Provided data for as long as you use the Application and for a reasonable time thereafter. If you'd like them to delete User Provided Data that you have provided via the Application, please contact them at support@knowo.com and they will respond in a reasonable time.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Children</h3>
          <p className="mb-3">
            The Service Provider does not use the Application to knowingly solicit data from or market to children under the age of 13.
          </p>
          <p className="mb-3">
            The Application does not address anyone under the age of 13. The Service Provider does not knowingly collect personally identifiable information from children under 13 years of age. In the case the Service Provider discover that a child under 13 has provided personal information, the Service Provider will immediately delete this from their servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact the Service Provider (support@knowo.com) so that they will be able to take the necessary actions.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Security</h3>
          <p>
            The Service Provider is concerned about safeguarding the confidentiality of your information. The Service Provider provides physical, electronic, and procedural safeguards to protect information the Service Provider processes and maintains.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Changes</h3>
          <p className="mb-3">
            This Privacy Policy may be updated from time to time for any reason. The Service Provider will notify you of any changes to the Privacy Policy by updating this page with the new Privacy Policy. You are advised to consult this Privacy Policy regularly for any changes, as continued use is deemed approval of all changes.
          </p>
          <p className="mb-3">
            This privacy policy is effective as of 2025-10-25
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Your Consent</h3>
          <p>
            By using the Application, you are consenting to the processing of your information as set forth in this Privacy Policy now and as amended by us.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Contact Us</h3>
          <p>
            If you have any questions regarding privacy while using the Application, or have questions about the practices, please contact the Service Provider via email at support@knowo.com.
          </p>
        </section>
      </div>
    </div>
  </div>
);

const TermsConditionsPage = () => (
  <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24 px-6 py-12">
    <div className="max-w-4xl mx-auto bg-gray-800/50 rounded-2xl p-8 border border-violet-500/30">
      <h1 className="text-4xl font-bold text-violet-400 mb-8 text-center">Terms & Conditions</h1>
      
      <div className="text-gray-300 space-y-6 text-sm leading-relaxed">
        <p className="text-gray-400 italic">
          These terms and conditions apply to the Knowo app (hereby referred to as "Application") for mobile devices that was created by Knowo Education Pvt. Ltd. (hereby referred to as "Service Provider") as an Ad Supported service.
        </p>

        <section>
          <p className="mb-3">
            Upon downloading or utilizing the Application, you are automatically agreeing to the following terms. It is strongly advised that you thoroughly read and understand these terms prior to using the Application. Unauthorized copying, modification of the Application, any part of the Application, or our trademarks is strictly prohibited. Any attempts to extract the source code of the Application, translate the Application into other languages, or create derivative versions are not permitted. All trademarks, copyrights, database rights, and other intellectual property rights related to the Application remain the property of the Service Provider.
          </p>
          <p className="mb-3">
            The Service Provider is dedicated to ensuring that the Application is as beneficial and efficient as possible. As such, they reserve the right to modify the Application or charge for their services at any time and for any reason. The Service Provider assures you that any charges for the Application or its services will be clearly communicated to you.
          </p>
          <p>
            The Application stores and processes personal data that you have provided to the Service Provider in order to provide the Service. It is your responsibility to maintain the security of your phone and access to the Application. The Service Provider strongly advise against jailbreaking or rooting your phone, which involves removing software restrictions and limitations imposed by the official operating system of your device. Such actions could expose your phone to malware, viruses, malicious programs, compromise your phone's security features, and may result in the Application not functioning correctly or at all.
          </p>
        </section>

        {/* Rest of terms content remains the same */}
        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Third-Party Services</h3>
          <p className="mb-3">
            Please note that the Application utilizes third-party services that have their own Terms and Conditions. Below are the links to the Terms and Conditions of the third-party service providers used by the Application:
          </p>
          <ul className="list-disc list-inside ml-4 mb-3">
            <li>AdMob</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Service Availability</h3>
          <p className="mb-3">
            Please be aware that the Service Provider does not assume responsibility for certain aspects. Some functions of the Application require an active internet connection, which can be Wi-Fi or provided by your mobile network provider. The Service Provider cannot be held responsible if the Application does not function at full capacity due to lack of access to Wi-Fi or if you have exhausted your data allowance.
          </p>
          <p className="mb-3">
            If you are using the application outside of a Wi-Fi area, please be aware that your mobile network provider's agreement terms still apply. Consequently, you may incur charges from your mobile provider for data usage during the connection to the application, or other third-party charges. By using the application, you accept responsibility for any such charges, including roaming data charges if you use the application outside of your home territory (i.e., region or country) without disabling data roaming. If you are not the bill payer for the device on which you are using the application, they assume that you have obtained permission from the bill payer.
          </p>
          <p className="mb-3">
            Similarly, the Service Provider cannot always assume responsibility for your usage of the application. For instance, it is your responsibility to ensure that your device remains charged. If your device runs out of battery and you are unable to access the Service, the Service Provider cannot be held responsible.
          </p>
          <p>
            In terms of the Service Provider's responsibility for your use of the application, it is important to note that while they strive to ensure that it is updated and accurate at all times, they do rely on third parties to provide information to them so that they can make it available to you. The Service Provider accepts no liability for any loss, direct or indirect, that you experience as a result of relying entirely on this functionality of the application.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Updates and Termination</h3>
          <p className="mb-3">
            The Service Provider may wish to update the application at some point. The application is currently available as per the requirements for the operating system (and for any additional systems they decide to extend the availability of the application to) may change, and you will need to download the updates if you want to continue using the application. The Service Provider does not guarantee that it will always update the application so that it is relevant to you and/or compatible with the particular operating system version installed on your device. However, you agree to always accept updates to the application when offered to you. The Service Provider may also wish to cease providing the application and may terminate its use at any time without providing termination notice to you. Unless they inform you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must cease using the application, and (if necessary) delete it from your device.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Changes to These Terms and Conditions</h3>
          <p className="mb-3">
            The Service Provider may periodically update their Terms and Conditions. Therefore, you are advised to review this page regularly for any changes. The Service Provider will notify you of any changes by posting the new Terms and Conditions on this page.
          </p>
          <p className="mb-3">
            These terms and conditions are effective as of 2025-10-25
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Contact Us</h3>
          <p>
            If you have any questions or suggestions about the Terms and Conditions, please do not hesitate to contact the Service Provider at support@knowo.com.
          </p>
        </section>
      </div>
    </div>
  </div>
);

const RefundPolicyPage = () => (
  <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24 px-6 py-12">
    <div className="max-w-4xl mx-auto bg-gray-800/50 rounded-2xl p-8 border border-violet-500/30">
      <h1 className="text-4xl font-bold text-violet-400 mb-8 text-center">Refund Policy</h1>
      
      <div className="text-gray-300 space-y-6 text-sm leading-relaxed">
        <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-4 mb-6">
          <p className="text-violet-300 font-semibold text-center">
            Knowo follows AML/KYC compliance. We do not allow crypto transactions from sanctioned countries. 
            All payments are non-refundable for delivered educational content.
          </p>
        </div>

        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Refund Policy Overview</h3>
          <p className="mb-3">
            Knowo Education Pvt. Ltd. ("Knowo", "we", "us", or "our") is committed to providing high-quality educational services through our platform. This Refund Policy outlines the circumstances under which refunds may be granted for subscriptions and services purchased through Knowo.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Subscription Payments</h3>
          <p className="mb-3">
            All subscription payments made for Knowo premium plans are non-refundable. Once a subscription payment is processed and educational content has been delivered or accessed, no refunds will be provided.
          </p>
          <p>
            Subscription fees are charged for access to our educational platform and content, not for financial returns or investment opportunities.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Technical Issues</h3>
          <p className="mb-3">
            In case of persistent technical issues that prevent access to the platform for more than 48 hours, users may contact our support team for assistance. Refunds will be considered on a case-by-case basis only if the issue is verified to be on our end and cannot be resolved.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Cancellation Policy</h3>
          <p className="mb-3">
            Users may cancel their subscription at any time. Cancellation will prevent future automatic renewals but does not entitle users to refunds for the current billing period.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Contact for Refund Inquiries</h3>
          <p>
            For any questions regarding this refund policy or to inquire about exceptional circumstances, please contact our support team at support@knowo.com.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Policy Updates</h3>
          <p>
            We reserve the right to modify this refund policy at any time. Changes will be effective immediately upon posting to our website.
          </p>
        </section>

        <p className="text-gray-400 text-center mt-8">
          Last updated: December 2024
        </p>
      </div>
    </div>
  </div>
);

const AMLPolicyPage = () => (
  <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24 px-6 py-12">
    <div className="max-w-4xl mx-auto bg-gray-800/50 rounded-2xl p-8 border border-violet-500/30">
      <h1 className="text-4xl font-bold text-violet-400 mb-8 text-center">AML/KYC Policy</h1>
      
      <div className="text-gray-300 space-y-6 text-sm leading-relaxed">
        <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-4 mb-6">
          <p className="text-violet-300 font-semibold text-center">
            Knowo follows strict AML/KYC compliance. We do not allow crypto transactions from sanctioned countries. 
            All payments are for educational content only, not investment returns.
          </p>
        </div>

        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Policy Statement</h3>
          <p className="mb-3">
            Knowo Education Pvt. Ltd. is committed to preventing money laundering and terrorist financing activities. We have implemented a comprehensive Anti-Money Laundering (AML) and Know Your Customer (KYC) policy to ensure compliance with applicable laws and regulations.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Customer Identification</h3>
          <p className="mb-3">
            We verify the identity of our users through appropriate documentation and maintain records of identification information. This includes:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2 mb-3">
            <li>Government-issued photo identification</li>
            <li>Proof of address documentation</li>
            <li>Additional verification as required by law</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Prohibited Jurisdictions</h3>
          <p className="mb-3">
            Knowo does not accept payments or provide services to individuals or entities in jurisdictions identified as high-risk or sanctioned by international bodies, including but not limited to:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2 mb-3">
            <li>Countries subject to comprehensive sanctions</li>
            <li>Jurisdictions identified by FATF as having strategic AML/CFT deficiencies</li>
            <li>Other restricted territories as updated periodically</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Transaction Monitoring</h3>
          <p className="mb-3">
            We monitor transactions for suspicious activities and report any可疑 transactions to the appropriate authorities as required by law.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Record Keeping</h3>
          <p>
            We maintain records of all transactions and identification documents for a minimum period as required by applicable laws and regulations.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-violet-300 mb-3">Compliance Officer</h3>
          <p>
            Knowo has designated a Compliance Officer responsible for implementing and monitoring our AML/KYC program. For any compliance-related inquiries, please contact compliance@knowoapp.com.
          </p>
        </section>

        <p className="text-gray-400 text-center mt-8">
          Last updated: December 2024
        </p>
      </div>
    </div>
  </div>
);

// Main Landing Page Component
const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [showTelegramPopup, setShowTelegramPopup] = useState(true);



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/contact`,
        formData
      );

      if (res.data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  // Smooth scrolling function
  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
      }
    }
  };

  // Update active section on scroll
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const sections = ["home", "about", "features", "pricing", "testimonials", "contact"];
      const scrollY = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollY >= element.offsetTop && scrollY < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
  if (location.pathname === "/") {
     const timer = setTimeout(() => setShowTelegramPopup(true), 500); // delay 0.5s
     return () => clearTimeout(timer);
   }
 }, [location.pathname]);

  // If not on home page, render the legal pages
if (location.pathname !== '/') {
  return (
    <Routes>
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
      <Route path="/refund-policy" element={<RefundPolicyPage />} />
      <Route path="/aml-policy" element={<AMLPolicyPage />} />
    </Routes>
  );
}

// 👇 Main landing page content goes here

   
  // UPDATED PRICING PLANS - Cryptomus Compliant
  const pricingPlans = [
    { 
      name: "Bronze Plan", 
      price: "Free", 
      description: "Access to basic learning content and reward points system",
      color: "from-purple-600 to-purple-700" 
    },
    { 
      name: "Silver Plan", 
      price: "$60", 
      description: "Enhanced learning modules with increased reward points",
      color: "from-purple-600 to-purple-700" 
    },
    { 
      name: "Gold 1 Plan", 
      price: "$100", 
      description: "Premium educational content with maximum reward points",
      color: "from-purple-600 to-purple-700" 
    },
    { 
      name: "Gold 2 Plan", 
      price: "$200", 
      description: "Advanced courses with comprehensive reward points system",
      color: "from-purple-600 to-purple-700" 
    },
    { 
      name: "Premium 1 Plan", 
      price: "$500", 
      description: "Expert level courses with exclusive reward points benefits",
      color: "from-purple-500 to-purple-600" 
    },
    { 
      name: "Premium 2 Plan", 
      price: "$1,000", 
      description: "Master level educational programs with premium rewards",
      color: "from-purple-600 to-purple-700" 
    },
    { 
      name: "Premium 3 Plan", 
      price: "$2000", 
      description: "Professional certification courses with special rewards",
      color: "from-purple-600 to-purple-700" 
    },
    { 
      name: "Premium 4 Plan", 
      price: "$5000", 
      description: "Enterprise level training with comprehensive reward system",
      color: "from-purple-500 to-purple-600" 
    },
    { 
      name: "Premium 5 Plan", 
      price: "$10,000", 
      description: "Elite educational package with maximum reward benefits",
      color: "from-purple-600 to-purple-700" 
    },
  ];

  return (
<div className="bg-gradient-to-b from-gray-900 to-black text-gray-200 font-sans">



       {/* 🟩 Telegram Popup */}
    {showTelegramPopup && (
      <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-6 max-w-sm w-[90%] text-center relative">
          <button
            onClick={() => setShowTelegramPopup(false)}
            className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
          >
            ✕
          </button>
          <div className="flex flex-col items-center space-y-4">
            <FaTelegram className="text-violet-500 text-6xl" />
            <h2 className="text-lg font-semibold text-gray-800">Join Our Telegram!</h2>
            <p className="text-gray-600 text-sm">
              Stay updated with the latest announcements and updates.
            </p>
            <a
              href="https://t.me/KnowoOfficial"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Join Now
            </a>
          </div>
        </div>
      </div>
    )}
  

      {/* Enhanced Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo with image */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="/assets/logo.png" 
              alt="Knowo Logo" 
              className="h-10 w-10 rounded-lg"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="hidden text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
              Knowo
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
              Knowo
            </h1>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 text-gray-300 font-medium">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "features", label: "Features" },
              { id: "pricing", label: "Pricing" },
              { id: "testimonials", label: "Testimonials" },
              { id: "contact", label: "Contact" }
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`hover:text-violet-400 transition-all duration-300 ${
                    activeSection === item.id ? "text-violet-400 font-semibold" : ""
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-2xl text-gray-300 hover:text-violet-400 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800">
            <ul className="flex flex-col p-4 gap-4">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "features", label: "Features" },
                { id: "pricing", label: "Pricing" },
                { id: "testimonials", label: "Testimonials" },
                { id: "contact", label: "Contact" }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left py-2 px-4 rounded-lg transition-all duration-300 ${
                      activeSection === item.id 
                        ? "bg-violet-500/20 text-violet-400 border-l-4 border-violet-400" 
                        : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Enhanced Hero Section */}
      <section
        id="home"
        className="min-h-screen pt-24 pb-0 px-6 flex flex-col justify-center items-center text-center bg-gradient-to-b from-gray-900 to-black"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent leading-tight">
            Learn. Engage. Grow.
          </h2>
          <p className="text-gray-400 mb-10 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Knowo — The innovative education platform where learning meets engagement. Complete educational tasks, interact with content, and earn reward points for your knowledge journey.
          </p>

          <Link
  to="/app-instruction"
  className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 transform hover:scale-105 mb-8"
>
  <FaGooglePlay className="text-2xl" />
  <span className="text-lg">App Instructions</span>
</Link>
        </div>
      </section>

     {/* Enhanced About Section */}
<section id="about" className="py-0 px-6 bg-black">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-4xl font-bold mb-8 text-violet-400">About Knowo</h2>
    <p className="text-gray-400 text-lg leading-relaxed mb-12">
      Knowo is an innovative education-based online platform designed to make learning more interactive, engaging, and accessible. The platform allows users to earn reward points by engaging in educational and knowledge-building activities.
    </p>

    {/* Two-column grid */}
    <div className="grid md:grid-cols-2 gap-8 mt-12">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-violet-500/10 hover:border-violet-500/30 transition-all duration-300">
        <h3 className="text-xl font-semibold mb-4 text-violet-300">Our Mission</h3>
        <p className="text-gray-400">
          To create an ecosystem where education meets engagement, making learning both intellectually enriching and rewarding through educational incentives.
        </p>
      </div>
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-violet-500/10 hover:border-violet-500/30 transition-all duration-300">
        <h3 className="text-xl font-semibold mb-4 text-violet-300">What We Offer</h3>
        <p className="text-gray-400">
          Interactive quizzes, educational videos, reward point systems, and premium subscription plans for enhanced learning experiences.
        </p>
      </div>
    </div>

    {/* Centered Button */}
    <div className="mt-10 flex justify-center">
      <a
        href="/about-us"
        className="inline-block px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl shadow-md transition-all duration-300"
      >
        More About Us →
      </a>
    </div>
  </div>
</section>




      {/* Enhanced Features Section */}
      <section id="features" className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-violet-400">App Highlights</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Educational Tasks & Rewards",
                desc: "Complete daily quizzes and video lessons to earn reward points and educational incentives while learning.",
                icon: "🎯"
              },
              {
                title: "Ad Engagement",
                desc: "Interact with AdMob advertisements to earn additional points and unlock premium educational content.",
                icon: "📱"
              },
              {
                title: "Referral Program",
                desc: "Invite friends to join Knowo and earn bonus reward points for every active referral.",
                icon: "👥"
              },
              {
                title: "Premium Subscriptions",
                desc: "Unlock enhanced learning content, exclusive materials, and ad-free experience with our tiered plans.",
                icon: "⭐"
              },
              {
                title: "Secure Platform",
                desc: "Safe, transparent, and user-friendly environment for both learners and content creators.",
                icon: "🔒"
              },
              {
                title: "Flexible Redemption",
                desc: "Convert your earned reward points into educational perks and platform benefits.",
                icon: "💎"
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-gradient-to-b from-gray-800 to-black p-8 rounded-2xl border border-violet-500/10 shadow-lg hover:shadow-violet-500/20 hover:border-violet-500/30 transition-all duration-300 group hover:transform hover:-translate-y-2"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-violet-300">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    

{/* UPDATED Pricing Plans Section - Cryptomus Compliant */}
<section id="pricing" className="py-20 px-6 bg-black">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold mb-6 text-center text-violet-400">Learning Plans</h2>
    
    {/* Crypto Compliance Banner */}
    <div className="max-w-2xl mx-auto mb-12 p-4 border-l-4 border-violet-400 bg-gray-900 text-gray-300 text-sm rounded-lg">
      ⚠️ Note: Cryptocurrency payments are accepted <strong>only for purchasing learning plans</strong>. 
      No financial returns, profit, or investment gains are associated with these payments. 
      All points and rewards are educational incentives.
    </div>
    
    <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
      Choose the plan that fits your learning goals. Higher tiers unlock premium educational content and enhanced reward point systems.
    </p>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {pricingPlans.map((plan, i) => (
        <div
          key={i}
          className="bg-gradient-to-b from-gray-800 to-black p-8 rounded-2xl border border-violet-500/10 shadow-lg hover:shadow-violet-500/20 transition-all duration-300"
        >
          <div className={`bg-gradient-to-r ${plan.color} text-white py-2 px-4 rounded-lg text-center mb-6`}>
            <h3 className="text-xl font-bold">{plan.name}</h3>
          </div>
         
          <div className="text-center mb-6">
            <span className="text-3xl font-bold text-violet-400">{plan.price}</span>
            {plan.price !== "Free" && <span className="text-gray-400 text-sm ml-2">/45 days</span>}
          </div>
          
          <p className="text-gray-300 text-center mb-6 text-sm leading-relaxed">
            {plan.description}
          </p>
          
          {/* Optional Button */}
          {plan.price !== "Free" && (
            <button className="w-full bg-gradient-to-r from-violet-500 to-purple-600 py-3 rounded-xl font-semibold text-white hover:opacity-90 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-all duration-300">
              Buy with Crypto
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Enhanced Testimonials */}
      <section id="testimonials" className="py-12 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-violet-400">What Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Aditi R.",
                message: "Knowo made learning engaging and rewarding! I've expanded my knowledge while earning reward points.",
                role: "Student"
              },
              {
                name: "Rahul K.",
                message: "The tiered plans are excellent - the premium content significantly enhanced my learning experience!",
                role: "Freelancer"
              },
              {
                name: "Priya M.",
                message: "Finally an app that values knowledge and engagement. The educational content is fantastic!",
                role: "Teacher"
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-gradient-to-b from-gray-800 to-black p-8 rounded-2xl border border-violet-500/10 shadow-lg hover:shadow-violet-500/20 transition-all duration-300 group"
              >
                <div className="text-yellow-400 text-2xl mb-4">"</div>
                <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors">
                  {testimonial.message}
                </p>
                <div>
                  <h4 className="text-violet-300 font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEGAL DISCLAIMER SECTION - Cryptomus Requirement */}
      <section className="bg-gray-800 py-8 px-6 text-gray-400 text-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-lg font-semibold text-violet-300 mb-4">Important Legal Disclaimer</h3>
          <p className="leading-relaxed">
            Knowo is an educational platform. All rewards, points, or incentives earned are provided as part of learning engagement programs and are not financial investments. 
            Cryptocurrencies are accepted only as payment for premium educational content and not for returns or profit-making activities. 
            Knowo does not provide any investment services, financial returns, or guaranteed profits. All reward points are educational incentives with no guaranteed monetary value.
          </p>
        </div>
      </section>

      {/* Enhanced Contact Form */}
      <section id="contact" className="py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-violet-400">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-b from-gray-900 to-black p-8 rounded-2xl border border-gray-800 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-violet-300">Get in Touch</h3>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-center gap-4 text-gray-300 hover:text-violet-400 transition-colors">
                  <div className="bg-violet-500/20 p-3 rounded-lg">
                    <FaEnvelope className="text-violet-400 text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <a 
                      href="mailto:support@knowo.com" 
                      className="hover:underline"
                    >
                      support@knowo.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 text-gray-300 hover:text-violet-400 transition-colors">
                  <div className="bg-violet-500/20 p-3 rounded-lg">
                    <FaPhone className="text-violet-400 text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold">Support</p>
                    <a 
                      href="tel:+919876543210" 
                      className="hover:underline"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* Office Address */}
                <div className="flex items-center gap-4 text-gray-300 hover:text-violet-400 transition-colors">
                  <div className="bg-violet-500/20 p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-violet-400 text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold">Office Address</p>
                    <p>Jumeirah Lake Towers, Floor 17<br />Near Peter London Office<br />Dubai, UAE</p>
                  </div>
                </div>
              </div>

              
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-gradient-to-b from-gray-900 to-black p-8 rounded-2xl border border-gray-800 shadow-lg"
            >
              <div className="space-y-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-4 bg-black border border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-200 placeholder-gray-500 transition-all"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full p-4 bg-black border border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-200 placeholder-gray-500 transition-all"
                  required
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="4"
                  className="w-full p-4 bg-black border border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-200 placeholder-gray-500 transition-all resize-none"
                  required
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-violet-500 to-purple-600 py-4 rounded-xl font-semibold text-white hover:opacity-90 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-all duration-300 transform hover:scale-105"
                >
                  {status === "sending"
                    ? "Sending..."
                    : status === "success"
                    ? "✅ Sent Successfully"
                    : status === "error"
                    ? "❌ Try Again"
                    : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

    {/* ENHANCED COMPLIANT FOOTER - Cryptomus Requirement */}
<footer className="bg-gray-950 text-gray-400 py-10 border-t border-gray-800">
  <div className="max-w-7xl mx-auto px-6">
    {/* Top Section */}
    <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-8">
      {/* Company Info */}
      <div className="text-center md:text-left">
        <h3 className="text-xl font-semibold text-violet-300 mb-2">Knowo Education Pvt. Ltd.</h3>
        <p className="text-sm max-w-sm">
          Empowering digital learning and professional growth through innovative education and technology-driven solutions.
        </p>
      </div>

     {/* Contact Details */}
<div className="text-center md:text-left">
  <h4 className="font-semibold text-violet-300 mb-2">Contact Info</h4>
  <p>Email: <a href="mailto:support@knowo.com" className="hover:text-violet-400">support@knowo.com</a><br />
  Tariw Ch: <a href="tel:+447881564071" className="hover:text-violet-400">+44 7881 564071</a></p>
</div>

      {/* Office Address */}
      <div className="text-center md:text-left">
        <h4 className="font-semibold text-violet-300 mb-2">Business Office</h4>
        <p>Jumeirah Lake Towers, Floor 17<br />
        Near Peter London Office<br />
        Dubai, UAE</p>
      </div>
    </div>

    {/* Policy Links */}
    <div className="flex flex-wrap justify-center gap-6 text-sm border-t border-gray-800 pt-6">
      <button onClick={() => navigate('/privacy-policy')} className="text-violet-400 cursor-pointer hover:text-violet-300 transition-colors">Privacy Policy</button>
      <button onClick={() => navigate('/terms-and-conditions')} className="text-violet-400 cursor-pointer hover:text-violet-300 transition-colors">Terms & Conditions</button>
      <button onClick={() => navigate('/refund-policy')} className="text-violet-400 cursor-pointer hover:text-violet-300 transition-colors">Refund Policy</button>
    </div>

    {/* Bottom Note */}
    <div className="text-center text-xs text-gray-500 mt-8">
      © 2025 Knowo Education Pvt. Ltd. | All Rights Reserved.  
    </div>
  </div>
</footer>

{/* Telegram Floating Button */}
<a
  href="https://t.me/KnowoOfficial"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed right-6 bottom-6 z-50 bg-[#0088cc] hover:bg-[#0077b3] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 group"
  aria-label="Join our Telegram"
>
  <FaTelegram className="text-2xl" />
  <span className="absolute right-14 bottom-8 bg-gray-900 text-white text-sm py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
    Join our Telegram
  </span>
</a>

    </div>
  );
};

export default LandingPage;