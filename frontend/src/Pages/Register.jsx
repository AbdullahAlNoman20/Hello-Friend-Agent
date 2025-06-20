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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-100 to-orange-200 p-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-4">
          Create an Account
        </h2>

        {/* Social Buttons */}
        <div className="flex gap-4 justify-center mb-6">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            <FaFacebookF /> Facebook
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
            <FaGoogle /> Google
          </button>
        </div>

        <div className="divider text-sm">or register with email</div>

        {/* Registration Form */}
        <form className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <div className="flex gap-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Country Dropdown */}
          <select
            name="country"
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Country</option>
            {countries.map((country, idx) => (
              <option key={idx} value={country}>
                {country}
              </option>
            ))}
          </select>

          {/* Gender Selection */}
          <div className="flex gap-6 items-center mt-2">
            <label className="label">
              <span className="label-text text-gray-700 font-medium">Gender:</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
                className="radio radio-orange-500"
              />
              <span>Male</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
                className="radio radio-orange-500"
              />
              <span>Female</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="Other"
                onChange={handleChange}
                className="radio radio-orange-500"
              />
              <span>Other</span>
            </label>
          </div>

          <button
            type="submit"
            className="btn bg-orange-500 hover:bg-orange-600 text-white w-full mt-4"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-600 hover:underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
