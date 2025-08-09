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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-8 text-center text-white">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <img
                src="/time-traveler.svg"
                alt="Time Traveler"
                className="w-12 h-12"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">AI Time Traveler Chat</h1>
          <p className="text-blue-100 text-sm">
            Meet different versions of yourself from across time and space
          </p>
        </div>

        {/* Form */}
        <div className="px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-800 mb-3"
              >
                What's your name?
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all duration-200 text-gray-800 placeholder-gray-500"
                required
              />
            </div>

            {/* Description Textarea */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-800 mb-3"
              >
                Tell us about yourself
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="I'm a gamer and love history..."
                rows="4"
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all duration-200 resize-none text-gray-800 placeholder-gray-500"
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                This helps your alternate selves understand who you are
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-4 px-6 rounded-xl transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <span>Start Your Journey</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-8">
            <div className="flex justify-center gap-4 text-2xl mb-3">
              <span>🏴‍☠️</span>
              <span>🤖</span>
              <span>🌾</span>
              <span>⚔️</span>
              <span>🔬</span>
            </div>
            <p className="text-sm text-gray-500">
              Five unique personalities await your conversation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
