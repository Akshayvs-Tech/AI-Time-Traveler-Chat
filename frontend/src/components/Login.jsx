
import React, { useState } from "react";

function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (name.trim() && email.trim() && email.includes("@")) {
      setIsLoading(true);
      
      // Store user data in localStorage
      localStorage.setItem("userData", JSON.stringify({ name, email }));
      
      // Simulate login process with a brief delay
      setTimeout(() => {
        setIsLoading(false);
        onLogin({ name, email });
      }, 1500);
    } else {
      alert("Please enter a valid name and email address.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="floating-circle absolute top-20 left-20 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
        <div className="floating-circle absolute top-40 right-32 w-16 h-16 bg-white bg-opacity-20 rounded-full" style={{ animationDelay: '2s' }}></div>
        <div className="floating-circle absolute bottom-40 left-40 w-12 h-12 bg-white bg-opacity-15 rounded-full" style={{ animationDelay: '4s' }}></div>
        <div className="floating-circle absolute bottom-20 right-20 w-24 h-24 bg-white bg-opacity-10 rounded-full" style={{ animationDelay: '1s' }}></div>
        <div className="floating-triangle absolute top-60 right-40 w-0 h-0 border-l-8 border-r-8 border-b-16 border-transparent border-b-white opacity-20" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="login-card bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
          {/* Header */}
          <div className="text-center py-12 px-8 bg-gradient-to-br from-indigo-600 via-purple-700 to-blue-600 relative overflow-hidden rounded-t-3xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-white bg-opacity-15 rounded-full -translate-x-12 -translate-y-12"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-white bg-opacity-15 rounded-full translate-x-10 translate-y-10"></div>
            <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-white bg-opacity-5 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="logo-container inline-flex items-center justify-center w-24 h-24 bg-white bg-opacity-90 rounded-3xl mb-6 relative z-10 shadow-2xl border-4 border-white border-opacity-30">
              <svg className="w-12 h-12 text-indigo-600 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-5xl font-black text-white mb-3 relative z-10 tracking-tight leading-tight">AI Chat</h1>
            <p className="text-white text-opacity-95 text-lg font-semibold relative z-10 tracking-wide">Connect with AI Personalities</p>
          </div>

          {/* Form */}
          <div className="px-10 py-10 bg-gradient-to-b from-gray-50 to-white relative rounded-b-3xl">
            {/* Subtle decorative line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-1.5 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"></div>
            
            <form onSubmit={handleLogin} className="space-y-6 mt-6">
              {/* Name Input */}
              <div className="form-group">
                <label htmlFor="name" className="block text-lg font-bold text-gray-900 mb-3 mx-2">
                  Full Name
                </label>
                <div className="input-container">
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="compact-input w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-3xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200 text-gray-900 font-medium placeholder-gray-400 shadow-sm mx-1"
                    placeholder="Enter your full name"
                    required
                  />
                  <div className="input-icon">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Email Input */}
              <div className="form-group">
                <label htmlFor="email" className="block text-lg font-bold text-gray-900 mb-3 mx-2">
                  Email Address
                </label>
                <div className="input-container">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="compact-input w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-3xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200 text-gray-900 font-medium placeholder-gray-400 shadow-sm mx-1"
                    placeholder="Enter your email address"
                    required
                  />
                  <div className="input-icon">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Login Button */}
              <div className="pt-6 mx-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="storytelling-button w-full flex justify-center items-center px-8 py-4 border border-transparent text-base font-bold rounded-3xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Connecting to AI Chat...
                    </>
                  ) : (
                    "Start Chatting with AI"
                  )}
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center mx-3">
              <p className="text-sm text-gray-600 font-medium px-2">
                🤖 Ready to chat with AI personalities? 💬
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          /* Enhanced Storytelling Login Card */
          .login-card {
            box-shadow: 
              0 32px 64px -12px rgba(79, 70, 229, 0.25),
              0 20px 25px -5px rgba(79, 70, 229, 0.1),
              0 8px 16px -5px rgba(0, 0, 0, 0.1);
            border: 3px solid rgba(255, 255, 255, 0.2);
            background: linear-gradient(145deg, #ffffff, #fafafa);
            animation: fade-in-up 0.8s ease-out;
            max-width: 480px;
            margin: 0 auto;
            position: relative;
            overflow: hidden;
            border-radius: 32px !important;
          }

          .login-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.03), rgba(236, 72, 153, 0.03));
            pointer-events: none;
            z-index: 1;
          }

          .login-card:hover {
            box-shadow: 
              0 40px 80px -12px rgba(79, 70, 229, 0.35),
              0 25px 35px -5px rgba(79, 70, 229, 0.15),
              0 12px 24px -5px rgba(0, 0, 0, 0.15);
            transform: translateY(-8px) scale(1.02);
          }

          /* Storytelling Form Groups */
          .form-group {
            margin-bottom: 1.5rem;
            position: relative;
            z-index: 2;
          }

          .form-group label {
            color: #111827;
            font-weight: 800;
            margin-bottom: 0.75rem;
            display: block;
            font-size: 18px;
            transition: all 0.3s ease;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
            letter-spacing: 0.025em;
            padding: 0.25rem 0.5rem;
            margin-left: 0.5rem;
            margin-right: 0.5rem;
          }

          /* Input Container with Magic */
          .input-container {
            position: relative;
            transition: all 0.3s ease;
          }

          .input-container:hover {
            transform: translateY(-2px);
          }

          .input-icon {
            position: absolute;
            right: 18px;
            top: 50%;
            transform: translateY(-50%);
            pointer-events: none;
            z-index: 3;
            transition: all 0.3s ease;
          }

          /* Storytelling Inputs */
          .compact-input {
            background: linear-gradient(145deg, #ffffff, #f8fafc);
            border: 2px solid #e5e7eb;
            border-radius: 24px !important;
            padding: 16px 48px 16px 20px;
            font-size: 17px;
            line-height: 1.5;
            color: #111827;
            font-weight: 600;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 
              0 4px 6px -1px rgba(0, 0, 0, 0.05),
              0 2px 4px -1px rgba(0, 0, 0, 0.03);
            position: relative;
            z-index: 2;
            margin: 0.25rem;
          }

          .compact-input:focus {
            border-color: #4f46e5;
            box-shadow: 
              0 0 0 4px rgba(79, 70, 229, 0.1),
              0 8px 16px -4px rgba(79, 70, 229, 0.2);
            background: #ffffff;
            transform: translateY(-2px);
          }

          .compact-input:hover:not(:focus) {
            border-color: #a5b4fc;
            box-shadow: 
              0 8px 12px -2px rgba(0, 0, 0, 0.1),
              0 4px 8px -2px rgba(0, 0, 0, 0.05);
            transform: translateY(-1px);
          }

          .compact-input::placeholder {
            color: #9ca3af;
            font-size: 16px;
            font-weight: 400;
            transition: all 0.3s ease;
            margin-left: 0.25rem;
          }

          .compact-input:focus::placeholder {
            color: #d1d5db;
            transform: translateY(-2px);
          }

          /* Magical Storytelling Button */
          .storytelling-button {
            background: linear-gradient(135deg, #8b5cf6, #ec4899, #f59e0b);
            background-size: 200% 200%;
            border: none;
            border-radius: 24px !important;
            padding: 16px 32px;
            font-size: 16px;
            font-weight: 700;
            color: #ffffff;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 
              0 8px 16px -4px rgba(139, 92, 246, 0.4),
              0 4px 8px -2px rgba(236, 72, 153, 0.3);
            position: relative;
            overflow: hidden;
            animation: gradient-shift 3s ease infinite;
            margin: 0.5rem;
          }

          .storytelling-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.6s ease;
          }

          .storytelling-button:hover::before {
            left: 100%;
          }

          .storytelling-button:hover:not(:disabled) {
            background: linear-gradient(135deg, #7c3aed, #db2777, #f59e0b);
            box-shadow: 
              0 16px 32px -8px rgba(139, 92, 246, 0.5),
              0 8px 16px -4px rgba(236, 72, 153, 0.4),
              0 0 20px rgba(139, 92, 246, 0.3);
            transform: translateY(-4px) scale(1.05);
          }

          .storytelling-button:active {
            transform: translateY(-2px) scale(1.02);
            box-shadow: 
              0 8px 16px -4px rgba(139, 92, 246, 0.4),
              0 4px 8px -2px rgba(236, 72, 153, 0.3);
          }

          .storytelling-button:focus {
            outline: none;
            box-shadow: 
              0 0 0 4px rgba(139, 92, 246, 0.2),
              0 8px 16px -4px rgba(139, 92, 246, 0.4),
              0 4px 8px -2px rgba(236, 72, 153, 0.3);
          }

          .storytelling-button:disabled {
            background: linear-gradient(135deg, #9ca3af, #6b7280);
            cursor: not-allowed;
            transform: none;
            box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.1);
            animation: none;
          }

          /* Enhanced Magical Logo Container */
          .logo-container {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2)) !important;
            backdrop-filter: blur(20px);
            border: 3px solid rgba(255, 255, 255, 0.6) !important;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 
              0 12px 24px rgba(0, 0, 0, 0.15),
              inset 0 2px 4px rgba(255, 255, 255, 0.4);
            position: relative;
            overflow: hidden;
          }

          .logo-container::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            animation: logo-shimmer 3s ease-in-out infinite;
          }

          .logo-container:hover {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2));
            transform: scale(1.1) rotate(10deg);
            box-shadow: 
              0 12px 24px rgba(0, 0, 0, 0.15),
              inset 0 2px 4px rgba(255, 255, 255, 0.4);
          }

          @keyframes logo-shimmer {
            0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
            50% { transform: translateX(100%) translateY(100%) rotate(45deg); }
            100% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          }

          /* Header Styling Enhancement */
          h1 {
            color: #ffffff !important;
            font-weight: 900 !important;
            letter-spacing: -0.025em;
            text-shadow: 
              0 6px 12px rgba(0, 0, 0, 0.4),
              0 3px 6px rgba(0, 0, 0, 0.3),
              0 1px 3px rgba(0, 0, 0, 0.2);
            position: relative;
            z-index: 10;
          }

          /* Enhanced Floating Elements */
          .floating-circle {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            animation: float 12s ease-in-out infinite;
            box-shadow: 
              0 8px 16px rgba(0, 0, 0, 0.1),
              inset 0 1px 2px rgba(255, 255, 255, 0.2);
          }

          .floating-triangle {
            filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.1));
            animation: float 10s ease-in-out infinite;
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
              opacity: 0.8;
            }
            33% {
              transform: translateY(-30px) rotate(120deg);
              opacity: 1;
            }
            66% {
              transform: translateY(-15px) rotate(240deg);
              opacity: 0.9;
            }
          }

          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translateY(40px) scale(0.9) rotate(-2deg);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1) rotate(0deg);
            }
          }

          /* Enhanced Background Gradient */
          .min-h-screen {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
            background-size: 300% 300%;
            animation: gradient-shift 15s ease infinite;
          }

          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            25% { background-position: 50% 0%; }
            50% { background-position: 100% 50%; }
            75% { background-position: 50% 100%; }
            100% { background-position: 0% 50%; }
          }

          /* Form Background Enhancement */
          .px-8.py-8 {
            background: linear-gradient(145deg, #fafafa, #ffffff, #f8fafc);
            border-top: 2px solid rgba(139, 92, 246, 0.1);
            position: relative;
          }

          /* Enhanced Responsive Design */
          @media (max-width: 640px) {
            .login-card {
              margin: 1rem;
              border-radius: 28px;
              max-width: 380px;
            }
            
            .px-8 {
              padding-left: 1.5rem;
              padding-right: 1.5rem;
            }
            
            .py-8 {
              padding-top: 1.5rem;
              padding-bottom: 1.5rem;
            }
            
            .floating-circle {
              width: 1.5rem !important;
              height: 1.5rem !important;
            }

            .compact-input {
              padding: 14px 44px 14px 18px;
              font-size: 15px;
              border-radius: 20px !important;
              margin: 0.2rem;
            }

            .storytelling-button {
              padding: 14px 28px;
              font-size: 15px;
              border-radius: 20px !important;
              margin: 0.3rem;
            }

            .logo-container {
              width: 20px;
              height: 20px;
            }

            .form-group label {
              font-size: 16px;
              margin: 0.25rem 0.25rem 0.5rem 0.75rem;
              padding: 0.2rem 0.4rem;
            }

            h1 {
              font-size: 2.5rem !important;
            }
          }

          /* Focus States Enhancement */
          .compact-input:focus + .input-icon svg {
            color: #4f46e5;
            transform: scale(1.15) rotate(5deg);
          }

          .input-container:hover .input-icon svg {
            transform: scale(1.1);
            color: #6366f1;
          }

          /* Form Validation States */
          .compact-input:invalid:not(:placeholder-shown) {
            border-color: #ef4444;
            box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
            background: linear-gradient(145deg, #fef2f2, #ffffff);
          }

          .compact-input:valid:not(:placeholder-shown) {
            border-color: #10b981;
            box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
            background: linear-gradient(145deg, #f0fdf4, #ffffff);
          }

          /* Icon Animations */
          .input-icon svg {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          /* Enhanced Loading Animation */
          .storytelling-button:disabled .animate-spin {
            animation: magical-spin 1.5s linear infinite;
          }

          @keyframes magical-spin {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.1); }
            100% { transform: rotate(360deg) scale(1); }
          }

          /* Hover Effects for Form Groups */
          .form-group:hover label {
            color: #4f46e5;
            transform: translateY(-3px);
            transition: all 0.3s ease;
            text-shadow: 0 2px 4px rgba(79, 70, 229, 0.1);
          }

          /* Footer Enhancement */
          .text-sm.text-gray-600 {
            background: linear-gradient(135deg, #4f46e5, #7c3aed, #ec4899);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 600;
            animation: text-shimmer 3s ease-in-out infinite;
            margin: 0.5rem;
            padding: 0.25rem 0.5rem;
          }

          @keyframes text-shimmer {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }

          /* Decorative Elements in Header */
          .absolute.top-0.left-0 {
            animation: float 8s ease-in-out infinite;
          }

          .absolute.bottom-0.right-0 {
            animation: float 10s ease-in-out infinite reverse;
          }

          .absolute.top-1\\/2.left-1\\/2 {
            animation: pulse 4s ease-in-out infinite;
          }

          @keyframes pulse {
            0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
          }
        `}
      </style>
    </div>
  );
}

export default Login;