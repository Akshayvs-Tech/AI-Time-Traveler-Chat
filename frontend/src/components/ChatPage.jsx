import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatBubble from "./ChatBubble";
import TransmissionAlert from "../components/TransmissionAlert";
import BackgroundMusic from "../components/BackgroundMusic";

const FUTURE_CHARACTERS = ["Robot Vedha", "Scientist Vedha"];

const ChatPage = () => {
  const [userData, setUserData] = useState(null);
  const [currentCharacter, setCurrentCharacter] = useState("pirate");
  const [messages, setMessages] = useState({
    pirate: [],
    robot: [],
    farmer: [],
    knight: [],
    scientist: [],
  });
  const [inputMessage, setInputMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const chatWindowRef = useRef(null);
  const navigate = useNavigate();

  // Load user data and check authentication
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (!storedUserData) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUserData);
    if (!user.isLoggedIn) {
      navigate("/login");
      return;
    }

    if (!user.chatSetupComplete) {
      navigate("/profile");
      return;
    }

    setUserData(user);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

  // Define characters (will only be used when userData exists)
  const characters = userData
    ? {
        pirate: {
          name: "Pirate",
          emoji: "🏴‍☠️",
          greeting: `Ahoy there, ${userData.name}! I be the pirate version of ye from the golden age of sail! What adventures shall we discuss?`,
        },
        robot: {
          name: "Robot",
          emoji: "🤖",
          greeting: `HELLO ${userData.name.toUpperCase()}. I AM YOUR FUTURE ROBOTIC CONSCIOUSNESS FROM THE YEAR 3024. WHAT DATA SHALL WE PROCESS?`,
        },
        farmer: {
          name: "Farmer",
          emoji: "🌾",
          greeting: `Howdy ${userData.name}! I'm the simple farming version of you from the countryside. Life's good when you're working the land!`,
        },
        knight: {
          name: "Knight",
          emoji: "⚔️",
          greeting: `Greetings, noble ${userData.name}! I am thy knightly self from medieval times. Honor and valor guide my words!`,
        },
        scientist: {
          name: "Scientist",
          emoji: "🔬",
          greeting: `Fascinating! ${userData.name}, I'm the researcher version of you from a parallel timeline. What hypotheses shall we explore?`,
        },
      }
    : {};

  const characterMap = {
    pirate: "Pirate Vedha",
    robot: "Robot Vedha",
    farmer: "Farmer Vedha",
    knight: "Knight Vedha",
    scientist: "Scientist Vedha",
  };

  // Initialize with greeting when character changes
  useEffect(() => {
    if (
      userData &&
      characters[currentCharacter] &&
      messages[currentCharacter].length === 0
    ) {
      setMessages((prev) => ({
        ...prev,
        [currentCharacter]: [
          {
            text: characters[currentCharacter].greeting,
            isUser: false,
            timestamp: Date.now(),
          },
        ],
      }));
    }
  }, [currentCharacter, userData, characters, messages]);

  // Auto scroll to bottom
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages[currentCharacter]]);

  // Don't render the chat interface until userData is loaded
  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleIncomingReply = (replyText, character) => {
    if (FUTURE_CHARACTERS.includes(characterMap[character])) {
      setAlertVisible(true);
      document.body.classList.add("flicker");
      setTimeout(() => document.body.classList.remove("flicker"), 700);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newUserMessage = {
      text: inputMessage,
      isUser: true,
      timestamp: Date.now(),
    };

    // Add user message
    setMessages((prev) => ({
      ...prev,
      [currentCharacter]: [...prev[currentCharacter], newUserMessage],
    }));

    const messageToSend = inputMessage;
    setInputMessage("");

    try {
      // Call backend API
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageToSend,
          character: currentCharacter,
          name: userData.name,
          description: userData.description,
        }),
      });

      // Check if the response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data); // Debug log

      if (data.reply) {
        setMessages((prev) => ({
          ...prev,
          [currentCharacter]: [
            ...prev[currentCharacter],
            {
              text: data.reply,
              isUser: false,
              timestamp: Date.now(),
            },
          ],
        }));

        // Add this line to trigger future effects
        handleIncomingReply(data.reply, currentCharacter);
      } else {
        throw new Error(data.error || "No reply received from server");
      }
    } catch (error) {
      console.error("Error sending message:", error);

      let errorMessage =
        "Sorry, I'm having trouble connecting right now. Please try again later.";

      // Provide more specific error messages
      if (error.message.includes("Failed to fetch")) {
        errorMessage =
          "Can't connect to the server. Please check if the backend is running.";
      } else if (error.message.includes("HTTP error")) {
        errorMessage = `Server error: ${error.message}`;
      }

      // Add error message to chat
      setMessages((prev) => ({
        ...prev,
        [currentCharacter]: [
          ...prev[currentCharacter],
          {
            text: errorMessage,
            isUser: false,
            timestamp: Date.now(),
          },
        ],
      }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col relative">
      <BackgroundMusic />
      <TransmissionAlert
        visible={alertVisible}
        text={"⚠️ MESSAGE FROM THE FUTURE"}
        onDone={() => setAlertVisible(false)}
      />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800 font-medium flex items-center gap-2 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Login
            </button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                AI Time Traveler Chat
              </h1>
              <p className="text-sm text-gray-600">
                Talking to {characters[currentCharacter].emoji}{" "}
                {characters[currentCharacter].name} {userData.name}
              </p>
            </div>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Character Selector */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {Object.entries(characters).map(([key, char]) => (
              <button
                key={key}
                onClick={() => setCurrentCharacter(key)}
                className={`flex-shrink-0 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                  currentCharacter === key
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                }`}
              >
                <span className="text-lg">{char.emoji}</span>
                <span>{char.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 max-w-6xl mx-auto w-full p-6">
        <div
          ref={chatWindowRef}
          className="h-[500px] overflow-y-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
          style={{
            background: "linear-gradient(180deg, #ffffff 0%, #fafafa 100%)",
          }}
        >
          {messages[currentCharacter].map((message, index) => (
            <ChatBubble
              key={index}
              message={message.text}
              isUser={message.isUser}
              character={currentCharacter}
            />
          ))}
          {messages[currentCharacter].length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <div className="text-6xl mb-4">
                  {characters[currentCharacter].emoji}
                </div>
                <p className="text-lg font-medium">
                  Start a conversation with {characters[currentCharacter].name}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Type a message below to begin
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <form onSubmit={handleSendMessage} className="flex gap-4 items-end">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Chat with ${characters[currentCharacter].name} ${userData.name}...`}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none resize-none"
                rows="2"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
            >
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
