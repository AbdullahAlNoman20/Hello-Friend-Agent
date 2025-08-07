"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! 👋 I'm your AI shopping assistant. How can I help you today? I can help you find products, answer questions about orders, or provide recommendations.",
      timestamp: new Date(),
      avatar: "🤖"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulated bot responses
  const botResponses = {
    greeting: [
      "Hello! How can I assist you with your shopping today?",
      "Hi there! Welcome to RetailAI. What can I help you find?",
      "Greetings! I'm here to make your shopping experience better. What do you need?"
    ],
    products: [
      "I'd be happy to help you find products! What type of items are you looking for?",
      "Great! We have a wide selection of products. Can you tell me more about what you're interested in?",
      "Let me help you discover the perfect products. What category interests you?"
    ],
    electronics: [
      "We have excellent electronics! Here are some popular categories:\n• Wireless Headphones\n• Smart Watches\n• Bluetooth Speakers\n• Fitness Trackers\n\nWould you like me to show you specific products?",
      "Electronics are a great choice! I can recommend some top-rated items in that category.",
      "Perfect! Our electronics section has the latest gadgets and devices."
    ],
    pricing: [
      "Our prices are competitive and we often have great deals! Would you like me to show you our current promotions?",
      "We offer various price ranges to fit different budgets. What's your preferred price range?",
      "I can help you find products within your budget. What price range are you looking for?"
    ],
    shipping: [
      "We offer fast and reliable shipping! Standard delivery takes 3-5 business days, and express shipping is available for 1-2 day delivery.",
      "Shipping is free on orders over $50! For smaller orders, standard shipping is $5.99.",
      "We ship to most locations worldwide. Where would you like your order delivered?"
    ],
    returns: [
      "We have a 30-day return policy for most items. If you're not satisfied, you can return your purchase for a full refund.",
      "Returns are easy! Just contact our customer service team and we'll help you process your return.",
      "We want you to be happy with your purchase. Our return policy ensures you can shop with confidence."
    ],
    default: [
      "I'm here to help! Could you please provide more details about what you're looking for?",
      "That's interesting! Let me know how I can assist you with your shopping needs.",
      "I'd love to help you with that. Can you tell me more about your requirements?"
    ]
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
    } else if (message.includes('product') || message.includes('item') || message.includes('find')) {
      return botResponses.products[Math.floor(Math.random() * botResponses.products.length)];
    } else if (message.includes('electronic') || message.includes('headphone') || message.includes('watch') || message.includes('speaker')) {
      return botResponses.electronics[Math.floor(Math.random() * botResponses.electronics.length)];
    } else if (message.includes('price') || message.includes('cost') || message.includes('expensive') || message.includes('cheap')) {
      return botResponses.pricing[Math.floor(Math.random() * botResponses.pricing.length)];
    } else if (message.includes('ship') || message.includes('delivery') || message.includes('shipping')) {
      return botResponses.shipping[Math.floor(Math.random() * botResponses.shipping.length)];
    } else if (message.includes('return') || message.includes('refund') || message.includes('exchange')) {
      return botResponses.returns[Math.floor(Math.random() * botResponses.returns.length)];
    } else {
      return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      avatar: "👤"
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date(),
        avatar: "🤖"
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickReplies = [
    "Show me electronics",
    "What's your return policy?",
    "Shipping information",
    "Price range options",
    "Product recommendations"
  ];

  const handleQuickReply = (reply) => {
    setInputMessage(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="text-2xl font-bold text-gray-900">
                  RetailAI
                </Link>
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <Link href="/" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                  <Link href="/products/product" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Products</Link>
                  <Link href="/chatbot" className="text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Chatbot</Link>
                  <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">About</a>
                  <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-500">{isConnected ? 'Online' : 'Offline'}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl">
                🤖
              </div>
              <div>
                <h1 className="text-xl font-bold">AI Shopping Assistant</h1>
                <p className="text-blue-100">Available 24/7 to help with your shopping needs</p>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                      {message.avatar}
                    </div>
                  </div>
                  <div className={`rounded-lg px-4 py-2 ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                      🤖
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="px-6 pb-4">
              <p className="text-sm text-gray-500 mb-3">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex space-x-4">
              <div className="flex-1">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="2"
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold mb-2">Smart Recommendations</h3>
            <p className="text-gray-600">Get personalized product suggestions based on your preferences and browsing history.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Instant Support</h3>
            <p className="text-gray-600">24/7 customer support with instant responses to all your shopping questions.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold mb-2">Product Search</h3>
            <p className="text-gray-600">Find exactly what you're looking for with our intelligent search and filtering system.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
