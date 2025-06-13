import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
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
      { sender: "system", text: "The system is under maintenance." },
    ];
    setChatHistory(updatedChat);
    setUserMessage("");
  };

  return (
    <div>
      {/* Banner */}
      <div
        className="h-[60vh] bg-cover bg-center flex items-center justify-center text-white relative rounded-lg"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506765515384-028b60a970df')",
        }}
      >
        <div className="text-center bg-black bg-opacity-60 p-8 rounded-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 hover:text-green-400 transition duration-300">
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
          <p className="text-lg mb-4">
            Empowering ideas through code and creativity.
          </p>
          <button
            onClick={() => setChatOpen(true)}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
          >
            Chat With Us
          </button>
        </div>
      </div>

      {/* Search Engine below banner */}
      <SearchEngine />

      {/*  Chat Dialog */}
      {chatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
            <div className="bg-green-600 text-white px-4 py-2 flex justify-between items-center">
              <span>Chat Support</span>
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
                  className={`p-2 rounded ${
                    msg.sender === "user"
                      ? "bg-green-100 text-right ml-auto max-w-xs"
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
                className="flex-grow px-3 py-2 border rounded-l outline-none"
                placeholder="Type your message..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="px-4 bg-green-600 text-white rounded-r hover:bg-green-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cards Section */}
      <section className="text-center m-10">
        <h1 className="font-bold text-2xl m-3">Product Recommendation</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur, mollitia quisquam hic magni aliquam facere ipsam pariatur! Iusto tempore, quod vero est doloremque ipsam sint aliquam in dolorum suscipit quibusdam.</p>
      </section>
      <Products />
    </div>
  );
};

export default Home;
