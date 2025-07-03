import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { path: "/", label: "Home", title: "Go to Homepage" },
    { path: "/add-product", label: "Add Product", title: "Post a New Product" },
    { path: "/about", label: "About", title: "Know About Us" },
    { path: "/login", label: "Login", title: "Login to your Account" },
    { path: "/register", label: "Register", title: "Create a New Account" },
  ];

  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo and Site Name */}
        <div className="flex items-center gap-3">
          <img
            src="/src/assets/Logo.png"
            alt="Logo"
            className="w-9 h-9 hover:scale-105 transition duration-300"
          />
          <NavLink
            to="/"
            className="text-2xl font-extrabold text-orange-400 hover:text-orange-500 transition duration-300"
            title="Hello Friend - Home"
          >
            Hello Friend
          </NavLink>
        </div>

        {/* Desktop NavLinks */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map(({ path, label, title }) => (
            <NavLink
              key={path}
              to={path}
              title={title}
              className={({ isActive }) =>
                `relative px-2 py-1 font-medium transition duration-200 ${
                  isActive
                    ? "text-orange-400 border-b-2 border-orange-400"
                    : "text-white hover:text-green-400"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-orange-400 focus:outline-none"
            title="Toggle Navigation"
          >
            {menuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 bg-[#1a1a1a] rounded-md shadow-lg p-4 space-y-3 animate-fadeIn">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={toggleMenu}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "text-gray-200 hover:bg-green-600 hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
