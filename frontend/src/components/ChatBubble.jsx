import React from "react";

const ChatBubble = ({ message, isUser, character }) => {
  const getCharacterStyle = (character) => {
    const styles = {
      pirate: {
        bg: "bg-gradient-to-br from-amber-50 to-amber-100",
        border: "border-amber-200",
        text: "text-amber-900",
        accent: "bg-gradient-to-r from-amber-600 to-amber-700",
        shadow: "shadow-amber-100",
      },
      robot: {
        bg: "bg-gradient-to-br from-slate-50 to-slate-100",
        border: "border-slate-200",
        text: "text-slate-900",
        accent: "bg-gradient-to-r from-slate-600 to-slate-700",
        shadow: "shadow-slate-100",
      },
      farmer: {
        bg: "bg-gradient-to-br from-green-50 to-green-100",
        border: "border-green-200",
        text: "text-green-900",
        accent: "bg-gradient-to-r from-green-600 to-green-700",
        shadow: "shadow-green-100",
      },
      knight: {
        bg: "bg-gradient-to-br from-purple-50 to-purple-100",
        border: "border-purple-200",
        text: "text-purple-900",
        accent: "bg-gradient-to-r from-purple-600 to-purple-700",
        shadow: "shadow-purple-100",
      },
      scientist: {
        bg: "bg-gradient-to-br from-cyan-50 to-cyan-100",
        border: "border-cyan-200",
        text: "text-cyan-900",
        accent: "bg-gradient-to-r from-cyan-600 to-cyan-700",
        shadow: "shadow-cyan-100",
      },
    };
    return styles[character] || styles.pirate;
  };

  const characterStyle = getCharacterStyle(character);

  if (isUser) {
    return (
      <div className="flex justify-end mb-6 animate-fadeIn">
        <div className="max-w-xs lg:max-w-md">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl px-5 py-3 shadow-lg">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-white rounded-full opacity-70"></div>
              <div className="text-xs font-medium opacity-90">You</div>
            </div>
            <div className="text-sm leading-relaxed">{message}</div>
          </div>
          <div className="text-xs text-gray-400 mt-1 text-right">
            {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-6 animate-fadeIn">
      <div className="max-w-xs lg:max-w-md">
        <div
          className={`border rounded-2xl px-5 py-3 shadow-lg ${characterStyle.bg} ${characterStyle.border} ${characterStyle.text} ${characterStyle.shadow}`}
        >
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-xs font-medium mb-2 ${characterStyle.accent}`}
          >
            <div className="w-2 h-2 bg-white rounded-full"></div>
            {character.charAt(0).toUpperCase() + character.slice(1)} You
          </div>
          <div className="text-sm leading-relaxed">{message}</div>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
