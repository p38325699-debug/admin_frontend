// src/pages/LandingPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaGooglePlay, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBars, FaTimes } from "react-icons/fa";



const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
const [status, setStatus] = useState("");

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
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "features", "testimonials", "contact"];
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
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-gray-200 font-sans">
      {/* ✅ Enhanced Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo with image */}
          <div className="flex items-center gap-3">
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

  {/* ✅ New Admin Button (Redirects to /login) */}
  <li>
    <a
      href="/login"
      className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-full shadow-lg shadow-violet-500/30 hover:scale-105 hover:shadow-violet-500/50 transition-all duration-300"
    >
      Admin
    </a>
  </li>
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

      {/* ✅ Enhanced Hero Section */}
      <section
        id="home"
        className="min-h-screen pt-32 pb-20 px-6 flex flex-col justify-center items-center text-center bg-gradient-to-b from-gray-900 to-black"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent leading-tight">
            Learn. Grow. Connect.
          </h2>
          <p className="text-gray-400 mb-10 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Knowo — The all-in-one app for learning, networking, and growing your
            skills through collaboration and innovation.
          </p>

          <a
            href="https://play.google.com/store/apps/details?id=com.quiz.com123"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 transform hover:scale-105"
          >
            <FaGooglePlay className="text-2xl" />
            <span className="text-lg">Get it on Google Play</span>
          </a>

          {/* <div className="mt-16 max-w-2xl mx-auto">
            <img
              src="https://via.placeholder.com/350x700/4A5568/FFFFFF?text=Knowo+App+Preview"
              alt="Knowo App Preview"
              className="mx-auto rounded-3xl shadow-2xl border-2 border-violet-500/20 transform hover:scale-105 transition-transform duration-300"
            />
          </div> */}
        </div>
      </section>

      {/* ✅ Enhanced About Section */}
      <section id="about" className="py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-violet-400">About Knowo</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-12">
            Knowo is a next-generation app built to empower learners and professionals.  
            Whether you're exploring new skills, connecting with mentors, or tracking your progress —  
            Knowo brings it all together in one intelligent platform.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-violet-500/10 hover:border-violet-500/30 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 text-violet-300">Our Mission</h3>
              <p className="text-gray-400">
                To make quality education and networking accessible to everyone, everywhere.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-violet-500/10 hover:border-violet-500/30 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 text-violet-300">Our Vision</h3>
              <p className="text-gray-400">
                Create a global community of lifelong learners and innovators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Enhanced Features Section */}
      <section id="features" className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-violet-400">App Highlights</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Interactive Learning",
                desc: "Engage with quizzes, lessons, and rewards that make learning fun and effective.",
                icon: "🎯"
              },
              {
                title: "Reward System",
                desc: "Earn points, badges, and exclusive rewards for completing your learning goals.",
                icon: "🏆"
              },
              {
                title: "Community Growth",
                desc: "Connect with like-minded learners and mentors from around the world.",
                icon: "🌍"
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

      {/* ✅ Enhanced Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-violet-400">What Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Aditi R.",
                message: "Knowo changed how I learn! The design and experience are incredible.",
                role: "Student"
              },
              {
                name: "Rahul K.",
                message: "Love the tasks and reward features — keeps me motivated to learn daily!",
                role: "Developer"
              },
              {
                name: "Priya M.",
                message: "Great UI, easy to navigate, and packed with useful learning tools.",
                role: "Designer"
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

      {/* ✅ Enhanced Contact Form */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-violet-400">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-b from-gray-900 to-black p-8 rounded-2xl border border-gray-800 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-violet-300">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-gray-300 hover:text-violet-400 transition-colors">
                  <div className="bg-violet-500/20 p-3 rounded-lg">
                    <FaEnvelope className="text-violet-400 text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>support@knowo.world</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-gray-300 hover:text-violet-400 transition-colors">
                  <div className="bg-violet-500/20 p-3 rounded-lg">
                    <FaPhone className="text-violet-400 text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p>+91-XXXXXXXXXX</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-gray-300 hover:text-violet-400 transition-colors">
                  <div className="bg-violet-500/20 p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-violet-400 text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p>India</p>
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
    />
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Your Email"
      className="w-full p-4 bg-black border border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-200 placeholder-gray-500 transition-all"
    />
    <textarea
      name="message"
      value={formData.message}
      onChange={handleChange}
      placeholder="Your Message"
      rows="2"
      className="w-full p-4 bg-black border border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-200 placeholder-gray-500 transition-all resize-none"
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

      {/* ✅ Enhanced Footer */}
      <footer className="bg-black py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <img 
              src="/logo.png" 
              alt="Knowo Logo" 
              className="h-12 w-12 rounded-lg"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
              Knowo
            </h3>
          </div>
          
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
            Learn. Grow. Connect — All in one app. Transform your learning journey with Knowo.
          </p>
          
          <div className="flex justify-center gap-8 mb-8 flex-wrap">
            <div className="flex items-center gap-3 text-gray-400 hover:text-violet-400 transition-colors">
              <FaEnvelope />
              <span>support@knowo.world</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400 hover:text-violet-400 transition-colors">
              <FaPhone />
              <span>+91-XXXXXXXXXX</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400 hover:text-violet-400 transition-colors">
              <FaMapMarkerAlt />
              <span>India</span>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Knowo. All rights reserved. | ❤️ for learners
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;