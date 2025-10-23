import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-200 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-violet-400 mb-4">About Knowo</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Transforming education through interactive learning and engagement rewards
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-violet-500/30 mb-8">
          <h2 className="text-2xl font-semibold text-violet-300 mb-6 text-center">Our Mission</h2>
          <p className="text-gray-300 text-lg leading-relaxed text-center">
            At Knowo, our mission is to create an ecosystem where education meets engagement. 
            We believe learning should not only enrich the mind but also provide meaningful 
            incentives for time and effort. Our platform helps users grow intellectually while 
            offering transparent and enjoyable ways to earn educational rewards.
          </p>
        </div>

        {/* What is Knowo */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-violet-500/30 mb-8">
          <h2 className="text-2xl font-semibold text-violet-300 mb-6">What is Knowo?</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Knowo is an innovative education-based online platform designed to make learning more 
            interactive, engaging, and accessible. The platform allows users to earn reward points 
            by participating in educational activities while gaining valuable knowledge and skills.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Through Knowo, users can register for free and participate in a variety of educational 
            tasks such as quizzes, video lessons, and learning challenges. Each activity helps users 
            learn new concepts and rewards them with educational incentives that can be redeemed for 
            platform benefits according to our terms and policies.
          </p>
        </div>

        {/* What Knowo Offers */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-violet-500/30 mb-8">
          <h2 className="text-2xl font-semibold text-violet-300 mb-6">What Knowo Offers</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-700/30 p-6 rounded-lg border border-gray-600">
              <h3 className="text-xl font-semibold text-violet-300 mb-3">Educational Tasks & Rewards</h3>
              <p className="text-gray-300">
                Users can complete educational tasks such as quizzes and video-based lessons. 
                Each task contributes to the user's learning progress and provides reward points 
                for educational incentives.
              </p>
            </div>

            <div className="bg-gray-700/30 p-6 rounded-lg border border-gray-600">
              <h3 className="text-xl font-semibold text-violet-300 mb-3">Ad Engagement</h3>
              <p className="text-gray-300">
                Knowo integrates AdMob ads as part of its user engagement model. By viewing 
                educational content with ads, users can earn additional reward points.
              </p>
            </div>

            <div className="bg-gray-700/30 p-6 rounded-lg border border-gray-600">
              <h3 className="text-xl font-semibold text-violet-300 mb-3">Referral Program</h3>
              <p className="text-gray-300">
                Users can invite friends to join the platform. When referred users become active, 
                the referrer earns bonus reward points for expanding our learning community.
              </p>
            </div>

            <div className="bg-gray-700/30 p-6 rounded-lg border border-gray-600">
              <h3 className="text-xl font-semibold text-violet-300 mb-3">Learning Community</h3>
              <p className="text-gray-300">
                Join a growing community of learners who are enhancing their knowledge while 
                earning educational rewards through engaging content and interactive activities.
              </p>
            </div>
          </div>
        </div>

        {/* Educational Benefits */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-violet-500/30 mb-8">
          <h2 className="text-2xl font-semibold text-violet-300 mb-6">Educational Benefits</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-violet-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-violet-300 mb-2">Diverse Learning</h3>
              <p className="text-gray-300 text-sm">
                Access to wide range of educational content across various subjects and skill levels
              </p>
            </div>

            <div className="text-center">
              <div className="bg-violet-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-violet-300 mb-2">Interactive Content</h3>
              <p className="text-gray-300 text-sm">
                Engaging quizzes, videos, and challenges that make learning enjoyable and effective
              </p>
            </div>

            <div className="text-center">
              <div className="bg-violet-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-violet-300 mb-2">Skill Development</h3>
              <p className="text-gray-300 text-sm">
                Build valuable knowledge and skills while being rewarded for your learning progress
              </p>
            </div>
          </div>
        </div>

        {/* Compliance Notice */}
        <div className="bg-violet-500/10 border border-violet-500/30 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-violet-300 mb-3 text-center">Important Notice</h3>
          <p className="text-violet-200 text-center text-sm leading-relaxed">
            Knowo is an educational platform focused on learning and skill development. 
            All rewards and incentives are provided as educational engagement benefits and 
            do not represent financial investments or guaranteed returns. We are committed 
            to maintaining a secure, transparent, and compliant digital learning environment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;