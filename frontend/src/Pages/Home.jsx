import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import { FaComments, FaLightbulb, FaRocket } from "react-icons/fa";
import SearchEngine from "../Components/SearchEngine";
import Products from "../Components/Products";

const Home = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = () => {
    if (userMessage.trim() === "") return;
    const updatedChat = [
      ...chatHistory,
      { sender: "user", text: userMessage },
      { sender: "system", text: "🚧 Our assistant is currently under maintenance. We'll be back soon!" },
    ];
    setChatHistory(updatedChat);
    setUserMessage("");
  };

  return (
    <div className="bg-orange-50 text-gray-800">
      {/* Banner */}
      <div
        className="h-[70vh] bg-cover bg-center flex items-center justify-center text-white relative rounded-lg shadow-lg"
        style={{
          backgroundImage:
            "url('https://i.ibb.co/v4Gr5b2S/Banner-Image.jpg')",
        }}
      >
        <div className="text-center p-8 rounded-lg border">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-orange-400 hover:text-white transition duration-300">
            <Typewriter
              words={[
                "Welcome to Hello Friend!",
                "Your Tech Partner",
                "Explore Our Solutions",
              ]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </h1>
          <p className="text-lg mb-4 flex items-center justify-center gap-2">
            <FaLightbulb className="text-yellow-300" /> Empowering ideas through code and creativity.
          </p>
          <button
            onClick={() => setChatOpen(true)}
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded shadow transition duration-300"
          >
            <FaComments className="inline-block mr-2" /> Chat With Us
          </button>
        </div>
      </div>

      {/* Search Engine below banner */}
      <SearchEngine />

      {/* Chat Dialog */}
      {chatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
            <div className="bg-orange-500 text-white px-4 py-2 flex justify-between items-center">
              <span>💬 Chat Support</span>
              <button
                onClick={() => {
                  setChatOpen(false);
                  setChatHistory([]);
                }}
                className="text-white text-xl hover:text-gray-200"
              >
                ×
              </button>
            </div>
            <div className="p-4 h-64 overflow-y-auto space-y-3 text-sm">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded shadow-md transition duration-200 ${
                    msg.sender === "user"
                      ? "bg-orange-100 text-right ml-auto max-w-xs"
                      : "bg-gray-200 text-left mr-auto max-w-xs"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex border-t p-2">
              <input
                type="text"
                className="flex-grow px-3 py-2 border rounded-l outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Type your message..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="px-4 bg-orange-500 text-white rounded-r hover:bg-orange-600 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cards Section */}
      <section className="text-center m-10">
        <h1 className="font-bold text-3xl m-3 text-orange-600 flex items-center justify-center gap-2">
          <FaRocket /> Product Recommendations
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover innovative solutions designed to elevate your lifestyle. Browse through our curated collection tailored to your needs.
        </p>
      </section>

      <Products />
    </div>
  );
};

export default Home;
