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
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      <BackgroundMusic />
      <TransmissionAlert
        visible={alertVisible}
        text={"⚠️ MESSAGE FROM THE FUTURE"}
        onDone={() => setAlertVisible(false)}
      />

      {/* Header */}
      <div className="bg-white shadow-md p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={handleLogout}
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            ← Back to Login
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-800">
              Talking to {characters[currentCharacter].emoji}{" "}
              {characters[currentCharacter].name} {userData.name}
            </h1>
          </div>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Character Selector */}
      <div className="bg-white border-b p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {Object.entries(characters).map(([key, char]) => (
              <button
                key={key}
                onClick={() => setCurrentCharacter(key)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  currentCharacter === key
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {char.emoji} {char.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 max-w-4xl mx-auto w-full p-4">
        <div
          ref={chatWindowRef}
          className="h-96 overflow-y-auto bg-white rounded-lg p-4 shadow-inner"
        >
          {messages[currentCharacter].map((message, index) => (
            <ChatBubble
              key={index}
              message={message.text}
              isUser={message.isUser}
              character={currentCharacter}
            />
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Chat with ${characters[currentCharacter].name} ${userData.name}...`}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
