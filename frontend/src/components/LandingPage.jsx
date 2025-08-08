import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in, if not redirect to login
    const userData = localStorage.getItem("userData");
    if (!userData) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(userData);

    // Check if user is logged in
    if (!user.isLoggedIn) {
      navigate("/login");
      return;
    }

    // If chat setup is already complete, go to chat
    if (user.chatSetupComplete) {
      navigate("/chat");
      return;
    }

    // Pre-fill name from login data
    setName(user.name || user.email.split("@")[0]);
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && description.trim()) {
      // Get existing user data and add chat data
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const completeChatData = {
        ...userData,
        name: name.trim(),
        description: description.trim(),
        chatSetupComplete: true,
      };

      localStorage.setItem("userData", JSON.stringify(completeChatData));
      navigate("/chat");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src="/time-traveler.svg"
              alt="Time Traveler"
              className="w-16 h-16 animate-pulse"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            AI Time Traveler Chat
          </h1>
          <div className="text-2xl mb-4">⏳🤖</div>
          <p className="text-gray-600">
            Meet different versions of yourself from across time and space!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              What's your name?
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              required
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tell us about yourself
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="I'm a gamer and love history..."
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Start Chat ✨
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Prepare to meet your alternate selves!
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
