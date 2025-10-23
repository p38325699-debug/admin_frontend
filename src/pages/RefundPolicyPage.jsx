// src/pages/RefundPolicyPage.jsx
import React, { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaShieldAlt, FaFileContract, FaEnvelope } from 'react-icons/fa';

const RefundPolicyPage = () => {
  const navigate = useNavigate();

 useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-2 px-6 py-2">
      {/* <div className="max-w-4xl mx-auto"> */}
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex cursor-pointer items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors mr-4"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>
        </div>

        <div className="bg-gray-800/50 rounded-2xl p-8 border border-violet-500/30">
          {/* Title Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="bg-violet-500/20 p-3 rounded-full">
                <FaFileContract className="text-violet-400 text-2xl" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-violet-400 mb-4">Refund Policy</h1>
            <p className="text-gray-400 text-lg">Last updated: December 2024</p>
          </div>

          {/* Compliance Banner */}
          <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-4">
              <FaShieldAlt className="text-violet-400 text-xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-violet-300 font-semibold text-lg mb-2">Important Compliance Notice</h3>
                <p className="text-violet-200">
                  Knowo follows AML/KYC compliance. We do not allow crypto transactions from sanctioned countries. 
                  All payments are non-refundable for delivered educational content. This platform is for educational purposes only and does not offer financial returns.
                </p>
              </div>
            </div>
          </div>

          <div className="text-gray-300 space-y-8">
            {/* Policy Overview */}
            <section>
              <h2 className="text-2xl font-semibold text-violet-300 mb-4">Refund Policy Overview</h2>
              <div className="bg-gray-700/30 rounded-lg p-6">
                <p className="mb-4">
                  Knowo Education Pvt. Ltd. ("Knowo", "we", "us", or "our") is committed to providing high-quality educational services through our platform. This Refund Policy outlines the circumstances under which refunds may be granted for subscriptions and services purchased through Knowo.
                </p>
                <p>
                  Please read this policy carefully before making any purchases on our platform. By using our services and making payments, you acknowledge that you have read, understood, and agreed to this refund policy.
                </p>
              </div>
            </section>

            {/* Subscription Payments */}
            <section>
              <h2 className="text-2xl font-semibold text-violet-300 mb-4">Subscription Payments</h2>
              <div className="bg-gray-700/30 rounded-lg p-6">
                <p className="mb-4">
                  All subscription payments made for Knowo premium plans are <strong>non-refundable</strong>. Once a subscription payment is processed and educational content has been delivered or accessed, no refunds will be provided under any circumstances.
                </p>
                <p className="mb-4">
                  Subscription fees are charged for access to our educational platform and content. These fees cover:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>Access to premium educational content and courses</li>
                  <li>Platform maintenance and infrastructure costs</li>
                  <li>Customer support services</li>
                  <li>Content development and updates</li>
                </ul>
                <p className="text-amber-300">
                  <strong>Important:</strong> Our platform is designed for educational purposes only. Subscription fees are not investments and do not guarantee any financial returns or profits.
                </p>
              </div>
            </section>

            {/* Technical Issues */}
            <section>
              <h2 className="text-2xl font-semibold text-violet-300 mb-4">Technical Issues & Service Availability</h2>
              <div className="bg-gray-700/30 rounded-lg p-6">
                <p className="mb-4">
                  In case of persistent technical issues that prevent access to the platform for more than 48 consecutive hours, users may contact our support team for assistance.
                </p>
                <p className="mb-4">
                  Refunds will be considered on a case-by-case basis only if:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>The technical issue is verified to be on our end</li>
                  <li>The issue cannot be resolved within a reasonable timeframe</li>
                  <li>No educational content has been accessed during the affected period</li>
                </ul>
                <p>
                  Scheduled maintenance, routine updates, or temporary service interruptions that are resolved within 48 hours do not qualify for refunds.
                </p>
              </div>
            </section>

            {/* Cancellation Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-violet-300 mb-4">Cancellation Policy</h2>
              <div className="bg-gray-700/30 rounded-lg p-6">
                <p className="mb-4">
                  Users may cancel their subscription at any time through their account settings. Cancellation will prevent future automatic renewals but does not entitle users to refunds for the current billing period.
                </p>
                <p>
                  Once cancelled, you will continue to have access to the premium features until the end of your current billing cycle. No partial refunds will be provided for unused portions of the subscription period.
                </p>
              </div>
            </section>

            {/* Payment Methods */}
            <section>
              <h2 className="text-2xl font-semibold text-violet-300 mb-4">Payment Methods & Cryptocurrency</h2>
              <div className="bg-gray-700/30 rounded-lg p-6">
                <p className="mb-4">
                  Knowo accepts various payment methods including cryptocurrency for educational subscriptions. Please note:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                  <li>Cryptocurrency payments are processed instantly and cannot be reversed</li>
                  <li>All cryptocurrency transactions are final</li>
                  <li>We do not accept payments from sanctioned countries or jurisdictions</li>
                  <li>Users are responsible for ensuring the accuracy of payment details</li>
                </ul>
                <p className="text-amber-300">
                  <strong>Note:</strong> Cryptocurrency payments are accepted solely as a payment method for educational services and do not represent any form of investment in our platform.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-violet-300 mb-4">Contact for Refund Inquiries</h2>
              <div className="bg-gray-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FaEnvelope className="text-violet-400" />
                  <p className="text-lg">
                    Email: <a href="mailto:support@knowoapp.com" className="text-violet-400 hover:underline">support@knowoapp.com</a>
                  </p>
                </div>
                <p className="mb-4">
                  For any questions regarding this refund policy or to inquire about exceptional circumstances, please contact our support team. Include the following information in your email:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Your registered email address</li>
                  <li>Subscription plan details</li>
                  <li>Date of purchase</li>
                  <li>Detailed description of your concern</li>
                </ul>
              </div>
            </section>

            {/* Policy Updates */}
            <section>
              <h2 className="text-2xl font-semibold text-violet-300 mb-4">Policy Updates</h2>
              <div className="bg-gray-700/30 rounded-lg p-6">
                <p className="mb-4">
                  We reserve the right to modify this refund policy at any time. Changes will be effective immediately upon posting to our website. It is your responsibility to review this policy periodically for any updates.
                </p>
                <p>
                  Continued use of our services after any modifications to this policy constitutes your acceptance of the revised terms.
                </p>
              </div>
            </section>

            {/* Summary Box */}
            <div className="bg-gray-700/50 rounded-lg p-6 border-l-4 border-amber-500">
              <h3 className="text-lg font-semibold text-amber-300 mb-3">Policy Summary</h3>
              <ul className="space-y-2 text-sm">
                <li>• All subscription payments are non-refundable once content is accessed</li>
                <li>• Technical issue refunds considered case-by-case for unresolved 48+ hour outages</li>
                <li>• Cancellation stops future renewals but doesn't refund current period</li>
                <li>• Cryptocurrency payments are final and irreversible</li>
                <li>• Contact support@knowoapp.com for any inquiries</li>
              </ul>
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default RefundPolicyPage;