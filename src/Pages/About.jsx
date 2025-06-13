import React from "react";

const About = () => {
  return (
    <div className="bg-white py-12 px-6 md:px-16 text-gray-800">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-orange-600 mb-4">About Data Solution 360</h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-600">
          Driving Data Innovation Across Bangladesh 🇧🇩
        </p>
      </div>

      {/* Company Overview */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">Who We Are</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            <strong>Data Solution 360</strong> is a dynamic data-centric company focused on transforming 
            businesses through advanced data-driven technologies. Since our inception, we've 
            aimed to empower businesses across Bangladesh with modern data tools and automation.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our core mission is to enable organizations—from startups to enterprises—to make smarter, 
            faster, and more efficient decisions with the power of data.
          </p>
        </div>
        <div>
          <img
            src="https://img.freepik.com/free-vector/data-analysis-concept-illustration_114360-8269.jpg"
            alt="About us"
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Current Focus */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">What We're Building</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          At present, we are actively developing a powerful <strong>B2B digital platform</strong> for 
          retailers and various sectors across Bangladesh. Our solution aims to modernize the 
          retail ecosystem by introducing:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Real-time inventory management tools</li>
          <li>Intelligent sales analytics</li>
          <li>Supply chain automation</li>
          <li>Custom dashboards & insights</li>
          <li>Retailer-vendor communication channels</li>
        </ul>
      </div>

      {/* Our Values */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="bg-orange-50 p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-lg font-bold text-orange-600 mb-2">Innovation</h3>
          <p className="text-gray-700">
            We constantly challenge the status quo by integrating data and creativity to build smarter solutions.
          </p>
        </div>
        <div className="bg-orange-50 p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-lg font-bold text-orange-600 mb-2">Collaboration</h3>
          <p className="text-gray-700">
            We believe in working hand-in-hand with our partners, clients, and communities to drive results.
          </p>
        </div>
        <div className="bg-orange-50 p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-lg font-bold text-orange-600 mb-2">Impact</h3>
          <p className="text-gray-700">
            Every solution we develop aims to create meaningful impact—economically, socially, and digitally.
          </p>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center mt-16">
        <p className="text-gray-600">
          Thank you for learning about us. Together, let's shape the future of data in Bangladesh.
        </p>
        <p className="mt-2 font-semibold text-orange-600">— Team Data Solution 360</p>
      </div>
    </div>
  );
};

export default About;
