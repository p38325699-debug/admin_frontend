import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 py-12 px-6 md:px-16 lg:px-32">
      <h1 className="text-3xl font-bold text-violet-400 mb-6">Contact Us</h1>
      <p className="mb-10 text-gray-400">
        Have questions or need help? Get in touch with us. We’re happy to assist
        you with any inquiries related to our app or services.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-gray-300 hover:text-violet-400 transition-colors">
            <div className="bg-violet-500/20 p-3 rounded-lg">
              <FaEnvelope className="text-violet-400 text-xl" />
            </div>
            <div>
              <p className="font-semibold">Email</p>
              <a
                href="mailto:support@knowo.world"
                className="hover:underline"
              >
                support@knowo.world
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-300 hover:text-violet-400 transition-colors">
            <div className="bg-violet-500/20 p-3 rounded-lg">
              <FaPhone className="text-violet-400 text-xl" />
            </div>
            <div>
              <p className="font-semibold">Phone</p>
              <a href="tel:+917056948928" className="hover:underline">
                +91 7056948928
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-300 hover:text-violet-400 transition-colors">
            <div className="bg-violet-500/20 p-3 rounded-lg">
              <FaMapMarkerAlt className="text-violet-400 text-xl" />
            </div>
            <div>
              <p className="font-semibold">Address</p>
              <p>Jumeirah Lake Towers, Floor 17
Near Peter London Office
Dubai, UAE</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-violet-300 mb-6">
            Send a Message
          </h2>

          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-400">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-violet-400 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-violet-400 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm text-gray-400">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-violet-400 focus:outline-none"
              placeholder="Write your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-violet-500 hover:bg-violet-600 text-white py-3 rounded-lg transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
