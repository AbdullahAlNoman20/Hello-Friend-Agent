import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t bg-base-300 text-base-content px-10 pt-10 pb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-2">Hello Friend</h2>
          <p className="text-sm">
            We are a creative tech company helping users with solutions
            in web, data, and design.
          </p>
        </div>

        {/* Services / Navigation */}
        <div>
          <h2 className="text-xl font-bold mb-2">Services</h2>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/" className="hover:underline hover:text-primary">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline hover:text-primary">About</Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline hover:text-primary">Login</Link>
            </li>
            <li>
              <Link to="/register" className="hover:underline hover:text-primary">Register</Link>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h2 className="text-xl font-bold mb-2">Follow Us</h2>
          <div className="flex gap-4 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-400 my-4"></div>

      {/* Copyright */}
      <div className="text-center text-sm">
        © 2025 Hello Friend. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
