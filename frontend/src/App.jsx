import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import ChatPage from "./components/ChatPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState("landing");
  const [userData, setUserData] = useState(null);

  const handleStartChat = (data) => {
    setUserData(data);
    setCurrentPage("chat");
  };

  const handleBackToLanding = () => {
    setCurrentPage("landing");
    setUserData(null);
  };

  return (
    <div className="App">
      {currentPage === "landing" ? (
        <LandingPage onStartChat={handleStartChat} />
      ) : (
        <ChatPage userData={userData} onBackToLanding={handleBackToLanding} />
      )}
    </div>
  );
};

export default App;
