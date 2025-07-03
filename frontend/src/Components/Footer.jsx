import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaCode,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1f1f1f] text-white px-6 md:px-16 pt-10 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold text-orange-400 mb-2 flex items-center gap-2">
            <FaCode /> Hello Friend
          </h2>
          <p className="text-sm text-gray-300">
            We deliver modern web solutions, data-driven products, and engaging designs.
            From idea to implementation — your tech journey starts here.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-orange-400 mb-2">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-orange-300 transition">🏠 Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-300 transition">ℹ️ About Us</Link>
            </li>
            <li>
              <Link to="/add-product" className="hover:text-orange-300 transition">➕ Add Product</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-orange-300 transition">🔐 Login</Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-orange-300 transition">📝 Register</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold text-orange-400 mb-2">Contact</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-orange-400" /> Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-2">
              <FaPhone className="text-orange-400" /> +880-1234-567890
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-orange-400" /> hello@friend.com
            </li>
          </ul>
        </div>

        {/* Social + Developer Info */}
        <div>
          <h2 className="text-xl font-semibold text-orange-400 mb-2">Connect</h2>
          <div className="flex gap-4 text-lg mb-4">
            <a
              href="https://facebook.com"
              className="hover:text-blue-500 transition"
              title="Facebook"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              className="hover:text-sky-400 transition"
              title="Twitter"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              className="hover:text-blue-600 transition"
              title="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn />
            </a>
          </div>

          <div className="text-sm text-gray-400 mt-2">
            <p className="text-orange-300 font-semibold">Developed By:</p>
            <p>Abdullah Al Noman</p>
            <p className="text-xs italic">Full-Stack Developer & Data Scientist</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-600 my-6"></div>

      {/* Copyright */}
      <p className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Hello Friend. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
