import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-black text-white px-6 py-3 flex justify-between items-center">
      {/* Left side: Logo + Text */}
      <div className="flex items-center space-x-2">
        <img src="/src/assets/Logo.png" alt="Logo" className="w-8 h-8" />
        <Link
          to="/"
          className="text-2xl font-bold hover:text-gray-400 hover:duration-300"
        >
          Hello Friend
        </Link>
      </div>

      {/* Right side: Links + Theme Toggle */}
      <div className="flex gap-6 items-center">
        <Link
          to="/"
          className="hover:text-gray-400 hover:underline duration-200"
        >
          Home
        </Link>
        <Link
          to="/add-product"
          className="hover:text-gray-400 hover:underline duration-200"
        >
          Add Product
        </Link>
        <Link
          to="/about"
          className="hover:text-gray-400 hover:underline duration-200"
        >
          About
        </Link>
        <Link
          to="/login"
          className="hover:text-gray-400 hover:underline duration-200"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="hover:text-gray-400 hover:underline duration-200"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
