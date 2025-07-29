import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    country: "",
    gender: "",
    role: "",
  });

  const countries = [
    "Bangladesh",
    "India",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white border-2 border-orange-300 rounded-xl shadow-lg p-10">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
          ✨ Create Your Account
        </h2>

        {/* Social Buttons */}
        <div className="flex gap-4 justify-center mb-6">
          <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition duration-300">
            <FaFacebookF /> Facebook
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition duration-300">
            <FaGoogle /> Google
          </button>
        </div>

        <div className="text-center text-sm text-gray-500 mb-6">
          — or register with email —
        </div>

        <form className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="👤 Username"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="📧 Email"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="📱 Phone Number"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="password"
              name="password"
              placeholder="🔒 Password"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="🔁 Confirm Password"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />
          </div>

          <select
            name="country"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
            required
          >
            <option value="">🌍 Select Country</option>
            {countries.map((country, idx) => (
              <option key={idx} value={country}>
                {country}
              </option>
            ))}
          </select>

          {/* Gender */}
          <div className="flex items-center gap-6">
            <span className="text-gray-700 font-medium">Gender:</span>
            {["Male", "Female", "Other"].map((gender) => (
              <label
                key={gender}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  onChange={handleChange}
                  className="accent-orange-500"
                />
                <span>{gender}</span>
              </label>
            ))}
          </div>

          {/* ✅ Role Selection */}
          <div className="flex items-center gap-6 mt-2">
            <span className="text-gray-700 font-medium">Role:</span>
            {["Buyer", "Seller", "Admin"].map((role) => (
              <label key={role} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value={role}
                  onChange={handleChange}
                  className="accent-orange-500"
                />
                <span>{role}</span>
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition duration-300 shadow-md mt-4"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-600 hover:underline font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;