import React from "react";

const ChatBubble = ({ message, isUser, character }) => {
  const getCharacterStyle = (character) => {
    const styles = {
      pirate: {
        bg: "bg-amber-100 border-amber-300",
        text: "text-amber-900",
        accent: "bg-amber-600",
      },
      robot: {
        bg: "bg-gray-100 border-gray-300",
        text: "text-gray-900",
        accent: "bg-gray-600",
      },
      farmer: {
        bg: "bg-green-100 border-green-300",
        text: "text-green-900",
        accent: "bg-green-600",
      },
      knight: {
        bg: "bg-purple-100 border-purple-300",
        text: "text-purple-900",
        accent: "bg-purple-600",
      },
      scientist: {
        bg: "bg-cyan-100 border-cyan-300",
        text: "text-cyan-900",
        accent: "bg-cyan-600",
      },
    };
    return styles[character] || styles.pirate;
  };

  const characterStyle = getCharacterStyle(character);

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-xs lg:max-w-md px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md">
          <div className="text-xs font-semibold mb-1 opacity-80">You</div>
          <div className="text-sm">{message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-4">
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 border-2 rounded-lg shadow-md ${characterStyle.bg} ${characterStyle.text}`}
      >
        <div
          className={`text-xs font-semibold mb-1 px-2 py-1 rounded-full text-white inline-block ${characterStyle.accent}`}
        >
          {character.charAt(0).toUpperCase() + character.slice(1)} You
        </div>
        <div className="text-sm mt-2">{message}</div>
      </div>
    </div>
  );
};

export default ChatBubble;
